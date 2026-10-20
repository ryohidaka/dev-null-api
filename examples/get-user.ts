import { DevNull } from "dev-null-api";

const api = new DevNull();
const user = await api.users.get("nunomaduro");

console.log(user);

// Output:
// {
//   id: "01a13fa8-6cd4-70ef-b8e5-f46a3ca70ca8",
//   username: "nunomaduro",
//   name: "nunomaduro",
//   avatarUrl: "https://avatars.githubusercontent.com/u/5457236?v=4",
//   bio: "staff software engineer at @laravel · speaker · content creator ...",
//   company: "@laravel",
//   location: "Portugal",
//   website: "https://youtube.com/@nunomaduro",
//   githubUrl: "https://github.com/nunomaduro",
//   htmlUrl: "https://dev-null.sh/@nunomaduro",
//   feedUrl: "https://dev-null.sh/@nunomaduro/feed.atom",
//   createdAt: Date,
//   commitsCount: 191,
//   followersCount: 4003,
//   followingCount: 88,
// }
