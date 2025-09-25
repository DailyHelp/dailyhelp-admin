'use client';

export default function VerificationInfo({ usersData }) {
  return (
    <div className="p-6 ">
      <div className="w-fit m-auto mb-6">
        <usersData.passport className="rounded-full" />
      </div>
      <div className="grid grid-cols-3 ">
        <div className="text-[#757C91]  space-y-4">
          <p>Full name</p>
          <p>Date of Birth</p>
          <p>Gender</p>
          <p>NIN</p>
          <p>BVN</p>
          <p>Home Address</p>
          <p>Utility bill</p>
        </div>
        <div className="justify-self-end col-span-2 text-[#3B4152] font-bold space-y-4 text-end">
          <p>{usersData.name}</p>
          <p>{usersData.dob}</p>
          <p>{usersData.gender}</p>
          <p>{usersData.nin}</p>
          <p>{usersData.bvn}</p>
          <p>{usersData.address}</p>
          <p>{usersData.gender}</p>
          <p className="text-justify font-normal text-sm">{usersData.direction}</p>
        </div>
      </div>
    </div>
  );
}
