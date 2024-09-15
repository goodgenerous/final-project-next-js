import React from "react";

const ProfileImage = ({ name }) => {
  const nameParts = name ? name.split(" ") : [];
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

  return (
    <span
      className="uppercase w-10 h-10 flex items-center justify-center"
      style={{ fontSize: "16px" }}
    >
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};

export default ProfileImage;
