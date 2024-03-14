import express from 'express';
import axios from 'axios';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT =  process.env.PORT  // or any other available port

// Add CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API routes
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Fetch user data from GitHub API
    const users = await fetchUsersFromGitHub();

    // Process user data to calculate streak and contributions
    const processedUsers = processUserData(users);

    // Rank users based on streak and contributions
    const rankedUsers = rankUsers(processedUsers);

    res.json(rankedUsers);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper functions
async function fetchUsersFromGitHub() {
    try {
        // Define the GitHub API endpoint and headers
        const apiUrl = 'https://api.github.com/users';
        const headers = {
          'Accept': 'application/vnd.github+json',
          'Authorization': 'Bearer YOUR_GITHUB_ACCESS_TOKEN'
        };
    
        // Fetch user data from the GitHub API
        const response = await axios.get(apiUrl, { headers });
        const users = response.data;
    
        // Fetch repository data for each user
        const usersWithRepos = await Promise.all(users.map(async (user) => {
          const reposResponse = await axios.get(`https://api.github.com/users/${user.login}/repos`, { headers });
          return { ...user, repos: reposResponse.data };
        }));
    
        return usersWithRepos;
      } catch (error) {
        console.error('Error fetching user data from GitHub:', error);
        throw error;
      }
    }

    function processUserData(users) {
        return users.map(user => {
          const { repos } = user;
      
          // Calculate the current streak for the user
          const commitDates = repos.flatMap(repo => repo.commits.map(commit => commit.commit.author.date));
          const sortedDates = commitDates.sort((a, b) => new Date(b) - new Date(a));
          let currentStreak = 1;
          let prevDate = sortedDates[0];
          for (let i = 1; i < sortedDates.length; i++) {
            const currDate = sortedDates[i];
            const diff = Math.floor((new Date(prevDate) - new Date(currDate)) / (1000 * 60 * 60 * 24));
            if (diff === 1) {
              currentStreak++;
            } else {
              break;
            }
            prevDate = currDate;
          }
      
          // Calculate the total contributions for the user
          const totalContributions = commitDates.length;
      
          return { ...user, currentStreak, totalContributions };
        });
      }

      function rankUsers(users) {
        return users.sort((a, b) => {
          // Sort by streak in descending order
          if (b.currentStreak !== a.currentStreak) {
            return b.currentStreak - a.currentStreak;
          }
          // If streak is equal, sort by contributions in descending order
          return b.totalContributions - a.totalContributions;
        });
      }