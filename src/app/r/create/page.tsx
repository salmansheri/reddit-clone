import { Metadata } from "next";
import Create from "./components/Create";

export const metadata: Metadata = {
  title: "reddit - Create Page",
  description: "create a new subreddit",
};

export default function CreatePage() {
  return (
    <div>
      <Create />
    </div>
  );
}
