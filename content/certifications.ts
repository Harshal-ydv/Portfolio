export type Credential = {
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  description: string;
  type: "Certification" | "Badge" | "Hackathon";
  image: string;
  badges?: string[];
};

export const certifications: Credential[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    credentialUrl: "https://www.credly.com/users/harshal-yadav.70e0e87f",
    description: "Foundational validation of AWS Cloud concepts, core services, security, architecture and pricing.",
    type: "Certification",
    image: "/certifications/cert1.jpg",
    badges: ["Foundational"],
  },
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    description: "Successfully completed Cisco’s Data Analytics Essentials course. Learned how analytics creates value from data; explored data formats, availability and acquisition; and practiced transformation, basic statistics and data preparation through hands-on work with Excel, SQL, Tableau and other tools.",
    type: "Badge",
    image: "/certifications/cert2.png",
    badges: ["Learning", "Foundational", "Free"],
  },
  {
    title: "Find Insights with AI",
    issuer: "Cisco",
    description: "Completed Cisco’s course using thematic analysis to examine text data with AI and spreadsheet apps, and practiced choosing the right AI or non-AI tool for each task.",
    type: "Badge",
    image: "/certifications/cert3.png",
    badges: ["Learning"],
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco",
    description: "Practiced using AI features in free apps, including photo tools, translation services and chatbots. Built prompting experience and learned fundamentals of how models work.",
    type: "Badge",
    image: "/certifications/cert4.png",
  },
  {
    title: "Bharatiya Antariksh Hackathon 2026",
    issuer: "ISRO · Hack2skill",
    description: "Certificate of participation recognizing a successful idea submission to the Bharatiya Antariksh Hackathon 2026, presented by the Indian Space Research Organisation and powered by Hack2skill.",
    type: "Hackathon",
    image: "/certifications/cert5.png",
    badges: ["Certificate of Participation"],
  },
  {
    title: "Logic Loop Hackathon 2026",
    issuer: "HackBriven · Data Axle",
    date: "1 Aug 2026",
    description: "Certificate recognizing active participation in Logic Loop Hackathon 2026, presented by HackBriven and held at the DataAxle office in Pune.",
    type: "Hackathon",
    image: "/certifications/cert6.png",
    badges: ["Certificate of Participation"],
  },
];
