const { Blog } = require("../models/blog.model");
const { Course } = require("../models/course.model");
const { Topper } = require("../models/topper.model");

// ---------------------------------------------------------------------------
// Sample Blogs (4 genuine, helpful articles — content is HTML)
// ---------------------------------------------------------------------------
const blogSamples = [
  {
    title: "How to Choose the Right Coaching Institute",
    slug: "how-to-choose-the-right-coaching-institute",
    category: "Guidance",
    excerpt:
      "Picking the right coaching institute can shape a student's academic journey. Here is a practical framework to evaluate your options before you enroll.",
    tags: ["coaching", "guidance", "study tips", "parents"],
    coverImage: "",
    order: 1,
    content: `
<h2>Why the Right Coaching Institute Matters</h2>
<p>Choosing a coaching institute is one of the most important decisions a student and their family will make. The right environment can build confidence, sharpen concepts, and create lasting study habits. The wrong one can drain time, money, and motivation. Because the stakes are high, it pays to evaluate your options carefully rather than enrolling based on advertisements or peer pressure.</p>

<h2>Look Beyond the Marketing</h2>
<p>Glossy brochures and topper photos are designed to impress, but they rarely tell the full story. Instead of being swayed by claims, ask for verifiable information. A trustworthy institute will be transparent about its results, its teaching staff, and its methods.</p>
<ul>
  <li><strong>Faculty quality:</strong> Find out who will actually teach your child, not just the names on the website. Experienced, consistent teachers matter more than star faculty who rarely appear.</li>
  <li><strong>Batch size:</strong> Smaller batches allow teachers to give individual attention. Ask how many students share a classroom.</li>
  <li><strong>Track record:</strong> Request honest data on past student performance, ideally for students with a similar starting level to yours.</li>
</ul>

<h2>Visit Before You Decide</h2>
<p>Whenever possible, visit the institute in person and attend a demo class. Observe whether the classroom is engaging, whether students feel comfortable asking questions, and whether the teacher explains concepts clearly. A free demo or trial week is one of the best ways to judge fit before committing.</p>

<h2>Assess the Support System</h2>
<p>Good coaching is about more than lectures. Look for regular tests, detailed feedback, doubt-clearing sessions, and progress tracking. Ask how the institute communicates with parents and how it helps students who fall behind. A strong support system keeps students on track through difficult phases.</p>

<h2>Consider Location and Schedule</h2>
<p>A long daily commute can exhaust a student and eat into study and rest time. Balance the reputation of an institute against practical factors like travel time, class timings, and how well the schedule fits alongside school.</p>

<h2>Match the Institute to the Student</h2>
<p>Every learner is different. Some students thrive in competitive, fast-paced batches; others need a patient, supportive setting. The best institute is not necessarily the most famous one, but the one that fits your child's pace, goals, and personality.</p>

<h2>Final Thoughts</h2>
<p>Take your time, gather honest information, and involve the student in the decision. When the institute, the teaching style, and the student's needs align, coaching becomes a genuine catalyst for growth rather than just another expense.</p>
`.trim(),
  },
  {
    title: "Online vs Offline Coaching in India: Which Is Right for You?",
    slug: "online-vs-offline-coaching-india",
    category: "Guidance",
    excerpt:
      "Both online and offline coaching have real strengths. This guide compares them honestly so you can choose the format that fits your learning style.",
    tags: ["online coaching", "offline coaching", "guidance", "study tips"],
    coverImage: "",
    order: 2,
    content: `
<h2>A Real Choice for Today's Students</h2>
<p>Not long ago, coaching meant travelling to a physical classroom. Today, students across India can choose between online and offline coaching, and many institutes offer both. Neither format is universally better. The right choice depends on the student's discipline, learning style, location, and goals.</p>

<h2>The Case for Offline Coaching</h2>
<p>Traditional classroom coaching still offers benefits that are hard to replicate on a screen.</p>
<ul>
  <li><strong>Structure and routine:</strong> Fixed timings and a dedicated space help students stay disciplined.</li>
  <li><strong>Direct interaction:</strong> Asking a doubt face-to-face and reading a teacher's body language can make concepts clearer.</li>
  <li><strong>Peer environment:</strong> Studying alongside motivated classmates creates healthy competition and friendships.</li>
  <li><strong>Fewer distractions:</strong> A classroom keeps phones and home interruptions at bay.</li>
</ul>

<h2>The Case for Online Coaching</h2>
<p>Online coaching has matured rapidly and now offers genuine advantages.</p>
<ul>
  <li><strong>Access to quality teachers:</strong> Students in smaller towns can learn from experienced faculty without relocating.</li>
  <li><strong>Flexibility:</strong> Recorded lectures let students learn at their own pace and revisit difficult topics.</li>
  <li><strong>Time and cost savings:</strong> No commute means more hours for study and rest, often at a lower fee.</li>
  <li><strong>Digital resources:</strong> Quizzes, analytics, and instant performance reports help track progress.</li>
</ul>

<h2>Honest Drawbacks to Weigh</h2>
<p>Offline coaching can involve long commutes and higher costs, and class pace is fixed for everyone. Online coaching demands strong self-discipline, a reliable internet connection, and the maturity to avoid distractions. Younger students in particular may struggle to stay focused without in-person supervision.</p>

<h2>How to Decide</h2>
<p>Ask a few honest questions. Does the student stay motivated without supervision? Is reliable internet available at home? How far is the nearest quality institute? Students who are self-driven and short on access to good teachers often do well online. Students who need structure and thrive on peer energy may prefer offline classes.</p>

<h2>The Hybrid Option</h2>
<p>Many families now choose a blended approach: offline classes for core subjects and online resources for revision and extra practice. This combines the discipline of a classroom with the flexibility of digital learning, and it is worth considering if your institute supports it.</p>

<h2>Final Thoughts</h2>
<p>There is no single right answer. Evaluate the student honestly, try a demo in both formats if you can, and choose the option that keeps learning consistent and engaging.</p>
`.trim(),
  },
  {
    title: "Career Guidance After 10th: How to Choose Your Stream",
    slug: "career-guidance-after-10th",
    category: "Career",
    excerpt:
      "Choosing a stream after Class 10 is a big step. Here is how students and parents can make a thoughtful, pressure-free decision.",
    tags: ["career guidance", "after 10th", "stream selection", "students"],
    coverImage: "",
    order: 3,
    content: `
<h2>One Decision, Many Possibilities</h2>
<p>After Class 10, students face their first major academic crossroads: choosing a stream for Classes 11 and 12. It can feel overwhelming, but it helps to remember that this decision opens doors rather than closing them. With the right approach, students can choose a path that genuinely suits them.</p>

<h2>Understand the Main Streams</h2>
<p>Most boards offer three broad streams, each leading to a wide range of careers.</p>
<ul>
  <li><strong>Science:</strong> Suited to students interested in engineering, medicine, research, technology, and data. It usually involves Physics, Chemistry, and either Mathematics or Biology.</li>
  <li><strong>Commerce:</strong> Ideal for those drawn to business, finance, accounting, economics, and entrepreneurship.</li>
  <li><strong>Humanities (Arts):</strong> A strong choice for students interested in law, civil services, design, media, psychology, languages, and the social sciences.</li>
</ul>

<h2>Start With the Student's Interests</h2>
<p>The most important question is not "which stream pays the most" but "what does the student enjoy and do well." A student who loves solving numerical problems may thrive in Science, while one who enjoys debate and writing may flourish in Humanities. Genuine interest sustains motivation through tough years of study.</p>

<h2>Consider Aptitude, Not Just Marks</h2>
<p>Marks matter, but aptitude matters more. A career counselling session or an aptitude assessment can reveal strengths a student may not have recognised. These tools are guides, not verdicts, but they add useful perspective to the decision.</p>

<h2>Avoid Common Mistakes</h2>
<p>Several pitfalls trap families every year. Choosing a stream because friends chose it rarely ends well. Picking a stream only because of family expectations can lead to burnout. And assuming Humanities has fewer opportunities is simply outdated. Decisions should be based on the individual student, not myths or pressure.</p>

<h2>Talk to People in the Field</h2>
<p>Conversations with seniors, professionals, and teachers can demystify each stream. Hearing what a typical day looks like in different careers helps students form realistic expectations rather than relying on assumptions.</p>

<h2>Final Thoughts</h2>
<p>There is no universally "best" stream, only the best stream for a particular student. When the choice reflects genuine interest, honest aptitude, and good information, students step into Class 11 with confidence and purpose.</p>
`.trim(),
  },
  {
    title: "Career Options After 12th: A Practical Guide",
    slug: "career-options-after-12th",
    category: "Career",
    excerpt:
      "Life after Class 12 offers more paths than ever. This practical guide helps students explore their options and plan a confident next step.",
    tags: ["career options", "after 12th", "career guidance", "higher education"],
    coverImage: "",
    order: 4,
    content: `
<h2>More Paths Than Ever Before</h2>
<p>Finishing Class 12 marks the start of adult decision-making. The good news is that students today have more options than any previous generation, across traditional degrees, professional courses, vocational training, and emerging fields. The challenge is choosing wisely rather than following the crowd.</p>

<h2>Map Options to Your Stream</h2>
<p>Your Class 12 stream shapes, but does not strictly limit, your choices.</p>
<ul>
  <li><strong>After Science:</strong> Engineering, medicine and allied health, pure sciences, architecture, data science, and technology roles.</li>
  <li><strong>After Commerce:</strong> Chartered Accountancy, company secretaryship, business management, economics, banking, and finance.</li>
  <li><strong>After Humanities:</strong> Law, civil services, journalism, design, psychology, education, and the social sciences.</li>
</ul>
<p>Many courses, such as management, design, and law, welcome students from any stream, so do not assume your options are narrow.</p>

<h2>Look Beyond the Obvious Degrees</h2>
<p>Engineering and medicine receive the most attention, but they are far from the only worthwhile paths. Fields such as design, hospitality, digital marketing, animation, and skilled trades offer strong careers. Vocational and diploma courses can lead to employment faster and suit students who prefer hands-on learning.</p>

<h2>Factor In Practical Realities</h2>
<p>A sound decision balances ambition with practicality. Consider the cost and duration of a course, the availability of scholarships or education loans, the job outlook in that field, and whether you are willing to relocate. Researching these factors early prevents difficult surprises later.</p>

<h2>Use Counselling and Research</h2>
<p>Career counselling can help match interests and aptitude to suitable paths. Combine professional guidance with your own research: read about course curricula, talk to current students, and explore what day-to-day work looks like in the careers you are considering.</p>

<h2>It Is Okay Not to Have It All Figured Out</h2>
<p>Few eighteen-year-olds know exactly what they want, and that is perfectly normal. Choosing a broad foundation course, staying open to internships, and being willing to adjust course are all valid strategies. Careers today rarely follow a straight line.</p>

<h2>Final Thoughts</h2>
<p>The step after Class 12 is important, but it is not irreversible. With honest self-assessment, solid research, and good guidance, students can choose a path that fits both their abilities and their aspirations, and build from there with confidence.</p>
`.trim(),
  },
];

// ---------------------------------------------------------------------------
// Sample Courses (6 — realistic dummy data)
// ---------------------------------------------------------------------------
const courseSamples = [
  {
    name: "Class 10 Mathematics — Foundation & Boards",
    slug: "class-10-mathematics",
    description:
      "A complete Class 10 Mathematics program that builds strong fundamentals and prepares students thoroughly for board examinations.",
    longDescription:
      "<p>This course covers the entire Class 10 Mathematics syllabus with a focus on conceptual clarity and exam readiness. Students work through chapter-wise theory, solved examples, and regular practice tests. Special emphasis is placed on important topics such as Algebra, Geometry, Trigonometry, and Statistics, ensuring students approach their board exams with confidence.</p>",
    subject: "Mathematics",
    classLevel: "Class 10",
    mode: "Offline",
    duration: "1 Year",
    feeRange: "₹8,000 – ₹12,000",
    highlights: [
      "Complete board syllabus coverage",
      "Weekly chapter-wise tests",
      "Doubt-clearing sessions",
      "Previous years' paper practice",
    ],
    coverImage: "",
    enrollCtaText: "Book a Free Demo",
    order: 1,
  },
  {
    name: "Class 10 Science — Concept Mastery",
    slug: "class-10-science",
    description:
      "An integrated Physics, Chemistry, and Biology program designed to make Class 10 Science concepts clear and memorable.",
    longDescription:
      "<p>Class 10 Science can feel vast, so this course breaks it into manageable, well-structured modules across Physics, Chemistry, and Biology. Interactive explanations, diagrams, and experiments help students truly understand concepts rather than memorise them. Frequent assessments track progress and highlight areas that need revision before the boards.</p>",
    subject: "Science",
    classLevel: "Class 10",
    mode: "Online & Offline",
    duration: "1 Year",
    feeRange: "₹9,000 – ₹14,000",
    highlights: [
      "Physics, Chemistry & Biology combined",
      "Concept-based teaching with visuals",
      "Regular practice assignments",
      "Board-oriented test series",
    ],
    coverImage: "",
    enrollCtaText: "Book a Free Demo",
    order: 2,
  },
  {
    name: "Class 12 Physics — Boards & Competitive",
    slug: "class-12-physics",
    description:
      "A rigorous Class 12 Physics course that strengthens board preparation while building a foundation for competitive exams.",
    longDescription:
      "<p>This course balances board exam preparation with the deeper problem-solving skills needed for competitive examinations. Students study the complete Class 12 Physics syllabus through clear theory sessions, derivations, and graded numerical practice. Regular mock tests build accuracy, speed, and exam temperament.</p>",
    subject: "Physics",
    classLevel: "Class 12",
    mode: "Offline",
    duration: "1 Year",
    feeRange: "₹12,000 – ₹18,000",
    highlights: [
      "Board and competitive exam focus",
      "Numerical problem-solving practice",
      "Comprehensive test series",
      "Experienced subject faculty",
    ],
    coverImage: "",
    enrollCtaText: "Book a Free Demo",
    order: 3,
  },
  {
    name: "Class 12 Chemistry — Complete Preparation",
    slug: "class-12-chemistry",
    description:
      "A well-rounded Class 12 Chemistry program covering Physical, Organic, and Inorganic Chemistry in depth.",
    longDescription:
      "<p>Chemistry rewards consistent practice and clear understanding, and this course is designed to deliver both. It covers Physical, Organic, and Inorganic Chemistry with structured notes, reaction mechanisms, and ample practice. Regular revision sessions and tests ensure students retain concepts through to their final examinations.</p>",
    subject: "Chemistry",
    classLevel: "Class 12",
    mode: "Online & Offline",
    duration: "1 Year",
    feeRange: "₹12,000 – ₹17,000",
    highlights: [
      "Physical, Organic & Inorganic coverage",
      "Reaction mechanism practice",
      "Structured revision modules",
      "Regular assessments and feedback",
    ],
    coverImage: "",
    enrollCtaText: "Book a Free Demo",
    order: 4,
  },
  {
    name: "Class 12 Biology — NEET Foundation",
    slug: "class-12-biology",
    description:
      "A focused Class 12 Biology course that supports board success while laying a strong foundation for NEET aspirants.",
    longDescription:
      "<p>This course covers the complete Class 12 Biology syllabus with detailed diagrams, concept maps, and topic-wise tests. It is ideal for students aiming for both strong board results and a solid base for NEET preparation. Faculty emphasise clarity, retention, and steady practice throughout the year.</p>",
    subject: "Biology",
    classLevel: "Class 12",
    mode: "Offline",
    duration: "1 Year",
    feeRange: "₹13,000 – ₹19,000",
    highlights: [
      "Board and NEET-oriented preparation",
      "Detailed diagrams and concept maps",
      "Topic-wise test series",
      "Doubt-clearing support",
    ],
    coverImage: "",
    enrollCtaText: "Book a Free Demo",
    order: 5,
  },
  {
    name: "Career Counselling Program",
    slug: "career-counselling-program",
    description:
      "A guided counselling program that helps students discover their strengths and choose the right academic and career path.",
    longDescription:
      "<p>The Career Counselling Program combines aptitude assessment, interest mapping, and one-on-one guidance to help students make informed decisions about streams, courses, and careers. Through interactive sessions, students gain clarity about their goals and a practical roadmap for the next steps in their journey.</p>",
    subject: "Career Guidance",
    classLevel: "Class 9 to Class 12",
    mode: "Online",
    duration: "6 Months",
    feeRange: "₹5,000 – ₹9,000",
    highlights: [
      "Aptitude and interest assessment",
      "One-on-one counselling sessions",
      "Stream and career roadmap",
      "Guidance for parents and students",
    ],
    coverImage: "",
    enrollCtaText: "Book a Free Demo",
    order: 6,
  },
];

// ---------------------------------------------------------------------------
// Sample Toppers (8 — dummy sample data)
// ---------------------------------------------------------------------------
const topperSamples = [
  {
    studentName: "Aarav Sharma",
    photo: "",
    examName: "Class 12 Board Examination",
    score: "98.4%",
    year: "2025",
    classLevel: "Class 12",
    board: "CBSE",
    achievement: "School topper in the Science stream",
    quote:
      "Consistent practice and regular doubt-clearing sessions made all the difference for me.",
    order: 1,
  },
  {
    studentName: "Diya Nair",
    photo: "",
    examName: "Class 10 Board Examination",
    score: "97.8%",
    year: "2025",
    classLevel: "Class 10",
    board: "ICSE",
    achievement: "Scored a perfect 100 in Mathematics",
    quote:
      "The supportive teachers helped me stay calm and confident through the exams.",
    order: 2,
  },
  {
    studentName: "Rohan Verma",
    photo: "",
    examName: "Class 12 Board Examination",
    score: "96.2%",
    year: "2024",
    classLevel: "Class 12",
    board: "CBSE",
    achievement: "Top scorer in Physics in the district",
    quote:
      "Solving previous years' papers regularly built my speed and accuracy.",
    order: 3,
  },
  {
    studentName: "Ananya Iyer",
    photo: "",
    examName: "Class 10 Board Examination",
    score: "95.6%",
    year: "2024",
    classLevel: "Class 10",
    board: "State Board",
    achievement: "Among the top ten students in her school",
    quote:
      "The weekly tests kept me on track and showed me exactly where to improve.",
    order: 4,
  },
  {
    studentName: "Karthik Reddy",
    photo: "",
    examName: "Class 12 Board Examination",
    score: "94.9%",
    year: "2025",
    classLevel: "Class 12",
    board: "State Board",
    achievement: "Excelled in the Commerce stream",
    quote:
      "Clear concepts and steady revision helped me perform my best on exam day.",
    order: 5,
  },
  {
    studentName: "Ishita Gupta",
    photo: "",
    examName: "Class 10 Board Examination",
    score: "93.7%",
    year: "2025",
    classLevel: "Class 10",
    board: "CBSE",
    achievement: "Outstanding improvement over the academic year",
    quote:
      "I learned how to study smart, not just hard, and my results reflected it.",
    order: 6,
  },
  {
    studentName: "Aditya Joshi",
    photo: "",
    examName: "Class 12 Board Examination",
    score: "92.8%",
    year: "2024",
    classLevel: "Class 12",
    board: "ICSE",
    achievement: "Strong all-round performance across subjects",
    quote:
      "The structured timetable and mock tests prepared me for every challenge.",
    order: 7,
  },
  {
    studentName: "Sneha Pillai",
    photo: "",
    examName: "Class 10 Board Examination",
    score: "92.3%",
    year: "2024",
    classLevel: "Class 10",
    board: "State Board",
    achievement: "First in her class in Science",
    quote:
      "Encouraging mentors helped me believe in myself and aim higher.",
    order: 8,
  },
];

// ---------------------------------------------------------------------------
// Idempotent seeding: only inserts into a collection when it is empty.
// ---------------------------------------------------------------------------
const seedContent = async () => {
  try {
    if ((await Blog.countDocuments()) === 0) {
      await Blog.insertMany(blogSamples);
      console.log(`Seeded ${blogSamples.length} blogs`);
    }

    if ((await Course.countDocuments()) === 0) {
      await Course.insertMany(courseSamples);
      console.log(`Seeded ${courseSamples.length} courses`);
    }

    if ((await Topper.countDocuments()) === 0) {
      await Topper.insertMany(topperSamples);
      console.log(`Seeded ${topperSamples.length} toppers`);
    }
  } catch (err) {
    console.log("seedContent error", err);
  }
};

module.exports = { seedContent };
