import { User, Link } from "@nextui-org/react";

const CommunityLead = () => {
  return (
    <>
      <div className="grid p-10 place-items-center ">
        <b className="mb-2 text-2xl sm:">
          &quot;Consistency Beats Talent&quot;
        </b>
        <p className="mb-5 text-xl text-justify sm:text-medium">
          Consistency beats talent because it is more sustainable, adaptable,
          and rewarding. <br />
          It helps one improve skills, achieve goals, and overcome challenges.
        </p>
        <Link href={`https://x.com/edmond_akwasi`} size="sm" isExternal>
          <User
            className="text-green-400"
            name="Edmond Akwasi"
            description="Githubstreak Community Lead"
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/107095324?v=4",
            }}
          />
        </Link>
      </div>
    </>
  );
};

export default CommunityLead;
