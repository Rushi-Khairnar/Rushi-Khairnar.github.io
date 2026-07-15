const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import DataStream from './components/DataStream';",
  "import DataStream from './components/DataStream';\nimport SectionGlitch from './components/SectionGlitch';"
);

code = code.replace(
  /<HeroSection \/>\s*<ProfileSection \/>\s*<RankProgression \/>\s*<SkillsSection \/>\s*<QuestLog \/>\s*<RaidHistory \/>\s*<Relics \/>\s*<AchievementsSection \/>\s*<GuildContributions \/>\s*<ContactSection \/>/g,
  `<SectionGlitch><HeroSection /></SectionGlitch>
            <SectionGlitch><ProfileSection /></SectionGlitch>
            <SectionGlitch><RankProgression /></SectionGlitch>
            <SectionGlitch><SkillsSection /></SectionGlitch>
            <SectionGlitch><QuestLog /></SectionGlitch>
            <SectionGlitch><RaidHistory /></SectionGlitch>
            <SectionGlitch><Relics /></SectionGlitch>
            <SectionGlitch><AchievementsSection /></SectionGlitch>
            <SectionGlitch><GuildContributions /></SectionGlitch>
            <SectionGlitch><ContactSection /></SectionGlitch>`
);

fs.writeFileSync('src/App.tsx', code);
