use SocialRhythmnDB
const userData = db.getCollection('User Data');
// Fake people from Copilot
const userMockData = [
    {
        user_first_name: "Alice",
        user_last_name: "Johnson",
        user_email: "alice@example.com",
        username: "alice123",
        password: "securepassword",
        user_bio: "Web developer and coffee enthusiast",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Bob",
        user_last_name: "Smith",
        user_email: "bob@example.com",
        username: "bobsmith",
        password: "strongpass",
        user_bio: "Frontend designer and cat lover",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Charlie",
        user_last_name: "Brown",
        user_email: "charlie@example.com",
        username: "charlieb",
        password: "brownie",
        user_bio: "Software engineer and hiking enthusiast",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Diana",
        user_last_name: "Miller",
        user_email: "diana@example.com",
        username: "dianam",
        password: "flowerpower",
        user_bio: "Graphic designer and bookworm",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Eva",
        user_last_name: "Garcia",
        user_email: "eva@example.com",
        username: "evag",
        password: "sunsetlover",
        user_bio: "Photographer and beach enthusiast",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Frank",
        user_last_name: "Lee",
        user_email: "frank@example.com",
        username: "frankl",
        password: "codingwizard",
        user_bio: "Full-stack developer and gamer",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Grace",
        user_last_name: "Wang",
        user_email: "grace@example.com",
        username: "gracew",
        password: "musiclover",
        user_bio: "Musician and foodie",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Henry",
        user_last_name: "Nguyen",
        user_email: "henry@example.com",
        username: "henryn",
        password: "travelbug",
        user_bio: "Travel blogger and adventure seeker",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Isabella",
        user_last_name: "Lopez",
        user_email: "isabella@example.com",
        username: "isabellal",
        password: "salsadancer",
        user_bio: "Dance instructor and salsa enthusiast",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        user_first_name: "Jack",
        user_last_name: "Robinson",
        user_email: "jack@example.com",
        username: "jackr",
        password: "treasurehunter",
        user_bio: "Archaeologist and puzzle solver",
        user_post_list: [],
        user_following_list: [],
        user_follower_list: [],
        date_created: new Date("2024-04-17"),
    },
];

// Overwrite old collection
userData.deleteMany({});
userData.insertMany(userMockData);

function addFollower(follower, following) {
    if (follower.username == following.username)
        return;
    // Update follower's following list
    userData.updateOne(
        { _id: follower._id },
        {
            $push: { user_following_list: following.username }
        }
    );
    // Update following's follower list
    userData.updateOne(
        { _id: following._id },
        {
            $push: { user_follower_list: follower.username }
        }
    );
}

// Friends network
userData.find().forEach(follower => {
    userData
        .aggregate([{ $sample: { size: Math.ceil(Math.random() * userMockData.length) } }])
        .forEach(following => {
            addFollower(follower, following);
        });
});

// Post data
const postData = db.getCollection('Post Data');
const postMockData = [
    {
        username: "alice123",
        title: "New Album Release",
        description: "Excited for the new album release from my favorite artist!",
        spotify_link: "",
        image_url: "https://example.com/image1.jpg",
        likes_list: ["bobsmith", "charlieb", "dianam", "evag"],
        dislikes_list: ["frankl", "gracew"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "bobsmith",
        title: "Concert Experience",
        description: "Had an amazing time at the concert last night!",
        spotify_link: "",
        image_url: "https://example.com/image2.jpg",
        likes_list: ["alice123", "charlieb", "dianam", "evag"],
        dislikes_list: ["gracew"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "charlieb",
        title: "Music Festival Highlights",
        description: "Recapping the best moments from the music festival!",
        spotify_link: "",
        image_url: "https://example.com/image3.jpg",
        likes_list: ["dianam", "evag", "frankl"],
        dislikes_list: ["alice123", "bobsmith"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "dianam",
        title: "Music Video Premiere",
        description: "Check out the premiere of the new music video!",
        spotify_link: "",
        image_url: "https://example.com/image4.jpg",
        likes_list: ["alice123", "charlieb", "evag"],
        dislikes_list: ["bobsmith", "gracew"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "evag",
        title: "Musician Spotlight",
        description: "Highlighting a talented musician and their journey.",
        spotify_link: "",
        image_url: "https://example.com/image5.jpg",
        likes_list: ["bobsmith", "dianam", "frankl"],
        dislikes_list: ["alice123", "gracew"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "frankl",
        title: "Music Production Tips",
        description: "Sharing some tips for music producers!",
        spotify_link: "",
        image_url: "https://example.com/image6.jpg",
        likes_list: ["charlieb", "evag"],
        dislikes_list: ["alice123", "bobsmith", "gracew"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "gracew",
        title: "Music Playlist",
        description: "Sharing my favorite music playlist!",
        spotify_link: "",
        image_url: "https://example.com/image7.jpg",
        likes_list: ["dianam", "evag"],
        dislikes_list: ["alice123", "bobsmith", "frankl"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "henryn",
        title: "Musician Collaboration",
        description: "Collaborating with another musician on a new project!",
        spotify_link: "",
        image_url: "https://example.com/image8.jpg",
        likes_list: ["evag"],
        dislikes_list: [],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "isabellal",
        title: "Music Genre Exploration",
        description: "Exploring different music genres and their origins.",
        spotify_link: "",
        image_url: "https://example.com/image9.jpg",
        likes_list: ["alice123", "charlieb"],
        dislikes_list: ["bobsmith", "gracew"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        username: "jackr",
        title: "Music Instrument Showcase",
        description: "Showcasing different musical instruments and their sounds.",
        spotify_link: "",
        image_url: "https://example.com/image10.jpg",
        likes_list: ["bobsmith", "dianam", "frankl"],
        dislikes_list: ["alice123", "gracew"],
        comments_list: [],
        date_created: new Date("2024-04-17"),
    },
];

/*
Mock data is missing:
    - user_id
And has incorrect type for 
    - likes_list
    - dislikes_list
To be filled programatically
*/

postMockData.forEach((post) => {
    const user = userData.findOne({ username: post.username })._id;
    const likes = post.likes_list.map(username => userData.findOne({ username: username })._id);
    const dislikes = post.dislikes_list.map(username => userData.findOne({ username: username })._id);
    post.user_id = user;
    post.likes_list = likes;
    post.dislikes_list = dislikes;
    post.image_url = "https://cdn.saleminteractivemedia.com/shared/images/default-cover-art.png"
});

// Overwrite old collection
postData.deleteMany({});
postData.insertMany(postMockData);

// Comment data
const commentData = db.getCollection('Comment Data')
const commentMockDataPool = [
    {
        comment_string: "Great post!",
        comment_like_list: ["bobsmith", "charlieb"],
        comment_dislike_list: ["dianam"],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "I agree, this is awesome!",
        comment_like_list: ["alice123", "charlieb"],
        comment_dislike_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "Thanks for sharing!",
        comment_like_list: ["dianam", "evag"],
        comment_dislike_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "Interesting perspective.",
        comment_like_list: ["alice123", "charlieb"],
        comment_dislike_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "I love this!",
        comment_like_list: ["bobsmith", "dianam"],
        comment_dislike_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "Keep up the good work!",
        comment_like_list: ["charlieb", "evag"],
        comment_dislike_list: ["alice123"],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "Nice!",
        comment_like_list: ["dianam", "evag"],
        comment_dislike_list: ["alice123", "bobsmith", "frankl"],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "Interesting read.",
        comment_like_list: ["evag"],
        comment_dislike_list: [],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "I didn't know that!",
        comment_like_list: ["alice123", "charlieb"],
        comment_dislike_list: ["bobsmith", "gracew"],
        date_created: new Date("2024-04-17"),
    },
    {
        comment_string: "Cool!",
        comment_like_list: ["bobsmith", "dianam", "frankl"],
        comment_dislike_list: ["alice123", "gracew"],
        date_created: new Date("2024-04-17"),
    },
];

/*
Mock data is missing:
    - post_id
    - user_id
    - username
To be filled programatically
*/

let commentMockData = []
postData.find().forEach(post => {
    // Random number of comments from comment pool, posted by random user
    for (let i = 0; i < Math.random() * 5; i++) {
        let comment = commentMockDataPool[Math.floor(Math.random() * commentMockDataPool.length)];
        let user = userData.aggregate([{ $sample: { size: 1 } }]).next();
        comment.post_id = post._id;
        comment.user_id = user._id;
        comment.username = user.username;
        commentMockData.push(comment);
    }
});

// Overwrite old collection
commentData.deleteMany({});
commentData.insertMany(commentMockData);