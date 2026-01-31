import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Creating 5 users with unique details
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        username: `user${i}`,
        displayName: `User ${i}`,
        bio: `Hi, I am user ${i}. Welcome to my profile!`,
        location: `India`,
        job: `Software Developer`,
        website: `google.com`,
      },
    });
    users.push(user);
  }
  console.log(`${users.length} users created`);

  // Creating 5 posts for each user
  const posts = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 5; j++) {
      const post = await prisma.post.create({
        data: {
          desc: `Post ${j} by ${users[i].username}`,
          userId: users[i].id,
        },
      });
      posts.push(post);
    }
  }
  console.log("Posts created");

  // Creating follows
  await prisma.follow.createMany({
    data: [
      { userId: users[0].id, followingId: users[1].id },
      { userId: users[0].id, followingId: users[2].id },
      { userId: users[1].id, followingId: users[3].id },
      { userId: users[2].id, followingId: users[4].id },
      { userId: users[3].id, followingId: users[0].id },
    ],
  });
  console.log("Follows created");

  // Creating likes
  await prisma.like.createMany({
    data: [
      { userId: users[0].id, postId: posts[0].id },
      { userId: users[1].id, postId: posts[1].id },
      { userId: users[2].id, postId: posts[2].id },
      { userId: users[3].id, postId: posts[3].id },
      { userId: users[4].id, postId: posts[4].id },
    ],
  });
  console.log("Likes created");

  // Creating comments (each comment is a post linked to a parent post)
  const comments = [];
  for (let i = 0; i < posts.length; i++) {
    const comment = await prisma.post.create({
      data: {
        desc: `Comment on Post ${posts[i].id} by ${users[(i + 1) % 5].username}`,
        parentPostId: posts[i].id, // linking the comment to the post
        userId: users[(i + 1) % 5].id,
      },
    });
    comments.push(comment);
  }
  console.log("Comments created");

  // Creating reposts using the post model's rePostId
  const reposts = [];
  for (let i = 0; i < posts.length; i++) {
    const repost = await prisma.post.create({
      data: {
        desc: `Repost of Post ${posts[i].id} by ${users[(i + 2) % 5].username}`,
        userId: users[(i + 2) % 5].id, // the user who reposted
        rePostId: posts[i].id, // linking the repost to the original post
      },
    });
    reposts.push(repost);
  }
  console.log("Reposts created", reposts);

  // Creating saved posts (users save posts they like)
  await prisma.savePost.createMany({
    data: [
      { userId: users[0].id, postId: posts[1].id },
      { userId: users[1].id, postId: posts[2].id },
      { userId: users[2].id, postId: posts[3].id },
      { userId: users[3].id, postId: posts[4].id },
      { userId: users[4].id, postId: posts[0].id },
    ],
  });
  console.log("Saved posts created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
