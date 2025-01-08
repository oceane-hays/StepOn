import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "@/services/FirebaseConfig";
import HomePage from "@/app/(component)/home";
import FitnessProfile from "@/app/(tabs)/profil";
import {fetchUsers} from "@/app/(component)/user";

interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  targets_steps: number;
}

export default function HomeScreen() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    fetchUsers(setUsers);

  }, []);

  return (
      <HomePage users={users} />


  );
}
