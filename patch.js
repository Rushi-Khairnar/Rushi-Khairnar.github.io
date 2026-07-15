const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');
code = code.replace(/export const SKILL_ARSENAL = \[[\s\S]*?\];/, `export const SKILL_ARSENAL = [
  {
    category: "Programming",
    skills: [
      { name: "Python", proficiency: 90 },
      { name: "R", proficiency: 75 }
    ],
  },
  {
    category: "Machine Learning",
    skills: [
      { name: "Supervised & Unsupervised Learning", proficiency: 85 },
      { name: "Model Building", proficiency: 80 }
    ],
  },
  {
    category: "Data Visualization",
    skills: [
      { name: "Power BI", proficiency: 95 },
      { name: "Excel", proficiency: 90 },
      { name: "Streamlit", proficiency: 85 }
    ],
  },
  {
    category: "AI & Prompt Eng.",
    skills: [
      { name: "Prompt Engineering", proficiency: 90 },
      { name: "ChatGPT", proficiency: 95 },
      { name: "Gemini", proficiency: 85 },
      { name: "Claude", proficiency: 80 }
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Google Colab", proficiency: 90 },
      { name: "VS Code", proficiency: 85 },
      { name: "Jupyter Notebook", proficiency: 95 },
      { name: "GitHub", proficiency: 80 }
    ],
  },
];`);
fs.writeFileSync('src/data.ts', code);
