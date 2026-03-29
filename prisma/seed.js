const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create Admin User
    await prisma.user.upsert({
        where: { email: 'admin@studyabroad.com' },
        update: {},
        create: {
            email: 'admin@studyabroad.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'admin',
        },
    });

    const countries = [
        {
            name: 'USA',
            slug: 'usa',
            heroTitle: 'Pursue Excellence in the United States',
            featured: true,
            overview: 'The USA is home to some of the world\'s most prestigious universities and offers a diverse range of programs and research opportunities.',
            scholarships: 'Financial Assistance offered in terms of GA (Graduate Assistantship), RA (Research Assistantship), and TA (Teaching Assistantship) for graduate students. The hierarchy of securing funding is typically PhD > Masters > Bachelors, though Bachelors degrees frequently offer university-specific merit scholarships, and need-based financial aid.',
            timeline: 'The typical US application process:\n1. Take English test (IELTS/TOEFL).\n2. Take SAT/GRE/GMAT (optional, but enhances funding and admission chances).\n3. Shortlist universities and email professors inquiring about research and funding. If funding is offered, apply to the university. If not, but TA/department funding is possible or you can afford the fees, apply anyway.\n4. Send financial documents (bank statements) to receive your I-20 form.\n5. Pay SEVIS & MRV fees, book a visa interview date, get transcript evaluated (WES/ECE/SpanTran if required). After acceptance/visa approval, book travel.',
            faqs: [
                { q: 'What is an SOP?', a: 'A Statement of Purpose (SOP) is an essay explaining your academic background, career goals, and reasons for choosing the specific program and university. It helps the admissions committee understand who you are beyond your grades.' },
                { q: 'What is an LOR?', a: 'A Letter of Recommendation (LOR) is a document written by a teacher, professor, or employer who can vouch for your academic or professional capabilities, character, and readiness for the program.' },
                { q: 'Is work allowed on F1 visa?', a: 'Yes, up to 20 hours per week on-campus during sessions and full-time during breaks.' },
                { q: 'What is OPT?', a: 'Optional Practical Training allows you to work in your field for 12-36 months after graduation.' },
                { q: 'Do I always need to do transcript evaluation?', a: 'Not always. It depends on the university. Many universities require a course-by-course evaluation by agencies like WES, ECE, or SpanTran to convert your grades to their GPA scale, but some assess international transcripts internally.' }
            ],
            requirementsByLevel: {
                '+2': 'GPA 3.0+, SAT optional but enhances profile, IELTS (preferred) 6.5+ or TOEFL 78+.',
                'Bachelor': 'GPA 2.8+, SAT optional but enhances profile, IELTS (preferred) 6.5+ or TOEFL 78+.',
                'Master': 'GPA 3.0+, GRE optional but enhances profile, IELTS (preferred) 6.5+ or TOEFL 78+. Published research enhances profile.',
                'PhD': 'Strong research background, GPA 3.5+, GRE (required by top schools, highly recommended otherwise), IELTS 6.5+ or TOEFL 78+, potential supervisor contact. Published research highly enhances profile.'
            },
            docsChecklistByLevel: {
                '+2': ['Transcript', 'Passport', 'IELTS/TOEFL scorecard', 'LORs (typically 2)', 'SAT(optional, but enhances profile)', 'SOP'],
                'Bachelor': ['Transcripts (+2)', 'Passport', 'IELTS/TOEFL', 'SAT (optional, but enhances profile)', 'SOP', 'LORs (typically 2)'],
                'Master': ['Degree Certificate (optional)', 'Transcripts (Bachelor)', 'Passport', 'GRE (optional)', 'IELTS/TOEFL', 'SOP', 'LORs (typically 3)', 'CV', 'Research papers (if any)'],
                'PhD': ['Degree Certificates (optional)', 'Transcripts (Master)', 'Passport', 'Publications', 'SOP', 'CV', 'LORs (typically 3)', 'IELTS/TOEFL', 'GRE/GMAT']
            },
            image: '/usa_study_abroad_1772254824903.png'
        },
        {
            name: 'Australia',
            slug: 'australia',
            heroTitle: 'Unlock Your Potential in Australia',
            featured: true,
            overview: 'Australia offers a high-quality education system and a great lifestyle, with a strong focus on practical and industry-relevant learning.',
            scholarships: 'Australia Awards, Destination Australia, and many university-specific scholarships.',
            timeline: 'Intakes in February and July (major intakes), and November (minor intake). Apply at least 4-6 months in advance.',
            faqs: [
                { q: 'What is an SOP?', a: 'A Statement of Purpose (SOP) is an essay explaining your academic background, career goals, and reasons for choosing the specific program and university. It helps the admissions committee understand who you are beyond your grades.' },
                { q: 'What is an LOR?', a: 'A Letter of Recommendation (LOR) is a document written by a teacher, professor, or employer who can vouch for your academic or professional capabilities, character, and readiness for the program.' },
                { q: 'What is the SSVF?', a: 'Simplified Student Visa Framework for streamlined processing.' }
            ],
            requirementsByLevel: {
                '+2': 'GPA 2.8+, IELTS 6.0 (no band less than 6.0) or PTE 58 (no band less than 50). Must show 1-year Bank Statement.',
                'Bachelor': 'GPA 2.5+, IELTS 6.0 (no band less than 6.0) or PTE 58 (no band less than 50). Must show 1-year Bank Statement.',
                'Master': 'Bachelor degree in relevant field, IELTS 6.5+. Must show 1-year Bank Statement, sponsor income of NRs 24 Lakh+ annually, and Tax Clearance Certificate.',
                'PhD': 'Masters degree with research, IELTS 6.5+. Must show 1-year Bank Statement, sponsor income NRs 24 Lakh+, and Tax Clearance.'
            },
            docsChecklistByLevel: {
                '+2': ['Transcripts', 'IELTS', 'SOP', 'LOR', 'Passport'],
                'Bachelor': ['Transcripts (+2)', 'IELTS', 'SOP', 'LOR', 'CAE/PTE', 'Passport'],
                'Master': ['Transcripts (Bachelor)', 'Work Experience (if any)', 'SOP', 'LOR', 'Passport'],
                'PhD': ['Master Transcript', 'Research Proposal', 'SOP', 'LOR', 'Passport']
            },
            image: '/australia_study_abroad_1772254842189.png'
        },
        {
            name: 'Canada',
            slug: 'canada',
            heroTitle: 'A Land of Opportunity: Study in Canada',
            featured: true,
            overview: 'Canada is known for its welcoming environment, high academic standards, and promising post-graduation work opportunities.',
            scholarships: 'Global Affairs Canada scholarships, Vanier Canada Graduate Scholarships.',
            timeline: 'Main intake is September. January and May intakes also available. Apply 6-8 months in advance.',
            faqs: [
                { q: 'What is an SOP?', a: 'A Statement of Purpose (SOP) explaining your goals and choice of course.' },
                { q: 'What is an LOR?', a: 'Letter of Recommendation from teachers/employers.' },
                { q: 'What is SDS?', a: 'Student Direct Stream (SDS) for faster processing. Requirements include IELTS 6.0 in each band, GIC, and one-year tuition payment.' },
                { q: 'What is GIC?', a: 'Guaranteed Investment Certificate (GIC) of around $20,635+ which covers your living expenses for the first year.' }
            ],
            requirementsByLevel: {
                '+2': 'GPA 3.0+, IELTS 6.0 (no band less than 6.0).',
                'Bachelor': 'GPA 2.8+, IELTS 6.5 (no band less than 6.0).',
                'Master': 'GPA 3.0+, IELTS 7.0 (no band less than 6.5). WES evaluation might be required.',
                'PhD': 'Strong research area, GPA 3.5+, IELTS 7.0.'
            },
            docsChecklistByLevel: {
                '+2': ['Transcripts', 'IELTS', 'SOP', 'Passport', 'Medical Upfront'],
                'Bachelor': ['Transcripts (+2)', 'IELTS', 'SOP', 'LOR', 'Passport', 'Medical Upfront'],
                'Master': ['Transcripts (Bachelor)', 'IELTS', 'SOP', 'LOR', 'CV', 'Passport', 'WES (if required)'],
                'PhD': ['Research Proposal', 'Transcripts (Master)', 'IELTS', 'SOP', 'LOR', 'Passport']
            },
            image: '/canada_study_abroad_1772254858084.png'
        },
        {
            name: 'UK',
            slug: 'uk',
            heroTitle: 'Historic Excellence: Study in the United Kingdom',
            featured: true,
            overview: 'The UK offers world-class education with shorter course durations, making it a cost-effective choice for many students.',
            scholarships: 'Chevening Scholarships, Commonwealth Scholarships, GREAT Scholarships.',
            timeline: 'Major intake in September/October. Minor intake in January. Apply 4-6 months earlier.',
            faqs: [
                { q: 'What is an SOP?', a: 'A Statement of Purpose (SOP) explaining your intent to study.' },
                { q: 'What is an LOR?', a: 'Letters of Recommendation from academic references.' },
                { q: 'What is CAS?', a: 'Confirmation of Acceptance for Studies (CAS) is a virtual document with a unique ID issued by your university after you pay the deposit.' },
                { q: 'What is the Credibility Interview?', a: 'A short interview by the Home Office to ensure you are a genuine student.' }
            ],
            requirementsByLevel: {
                '+2': 'GPA 2.8+, IELTS 6.0 (no band less than 5.5).',
                'Bachelor': 'GPA 2.6+, IELTS 6.0 (no band less than 5.5).',
                'Master': 'Bachelor with 60%+, IELTS 6.5 (no band less than 6.0).',
                'PhD': 'Masters degree, Research Proposal, IELTS 7.0.'
            },
            docsChecklistByLevel: {
                '+2': ['Transcripts', 'IELTS', 'SOP', 'Passport', 'TB Certificate'],
                'Bachelor': ['Transcripts (+2)', 'IELTS', 'SOP', 'LOR', 'Passport', 'TB Certificate'],
                'Master': ['Transcripts (Bachelor)', 'IELTS', 'SOP', 'LOR', 'CV', 'Passport', 'CAS'],
                'PhD': ['Master Degree', 'Research Proposal', 'SOP', 'LOR', 'Passport', 'TB Cert']
            },
            image: '/uk_study_abroad_1772254875758.png'
        },
        {
            name: 'Germany',
            slug: 'germany',
            heroTitle: 'Master the Future in Germany',
            featured: false,
            overview: 'Germany is a hub for engineering and technology, offering low or no tuition fees at public universities.',
            scholarships: 'DAAD Scholarships, Heinrich Böll Scholarships.',
            timeline: 'Winter Semester (October) is main. Summer (April) is secondary. Start APS process early.',
            faqs: [
                { q: 'What is APS?', a: 'The APS Certificate is a mandatory verification of academic documents for students from Nepal applying to Germany. It verifies the authenticity of your degrees.' },
                { q: 'What is a Blocked Account?', a: 'A Blocked Account (Sperrkonto) is a special type of bank account for international students in Germany to prove they have enough money to live for one year, typically requiring around €11,208.' },
                { q: 'Public vs Private Univ?', a: 'Public universities are state-funded and usually have no tuition fees (only semester fees), while private universities charge tuition but often have easier admission criteria.' },
                { q: 'What is Uni-assist?', a: 'Uni-assist is a service that evaluates international school-leaving certificates for many German universities to see if they meet German standards.' }
            ],
            requirementsByLevel: {
                '+2': 'GPA 3.0+, High school diploma, German level (B1/B2) for public or IELTS 6.0 for private.',
                'Bachelor': 'University Entrance Exam or Studienkolleg (if required). German C1 or IELTS 6.5.',
                'Master': 'Bachelor degree in relevant field, ECTS credits matching German standards, IELTS 6.5+ or German C1.',
                'PhD': 'Masters degree, GPA 3.5+, Finding a supervisor is the first step.'
            },
            docsChecklistByLevel: {
                '+2': ['APS Certificate', 'Transcripts', 'German Language Cert', 'Passport', 'Blocked Account'],
                'Bachelor': ['APS Certificate', 'Studienkolleg Entrance', 'Transcripts (+2)', 'Passport', 'Blocked Account'],
                'Master': ['APS Certificate', 'Bachelor Degree', 'Transcripts (Bachelor)', 'IELTS/German Cert', 'SOP', 'CV', 'Passport'],
                'PhD': ['APS Certificate', 'Supervisor Acceptance', 'Master Degree', 'Research Plan', 'Passport']
            },
            image: '/germany_study_abroad_1772254889948.png'
        },
        {
            name: 'Japan',
            slug: 'japan',
            heroTitle: 'Tradition Meets Innovation in Japan',
            featured: false,
            overview: 'Japan offers a unique cultural experience combined with advanced technology and high-quality education.',
            scholarships: 'MEXT Scholarships, JASSO scholarships.',
            timeline: 'Intakes in April (main) and October. Start the process 6-8 months in advance.',
            faqs: [
                { q: 'What is a COE?', a: 'The Certificate of Eligibility (COE) is a document issued by the Japanese Immigration Services under the Ministry of Justice. It is mandatory for obtaining a Student Visa and is applied for by the school on your behalf.' },
                { q: 'Is JLPT mandatory?', a: 'For Japanese-taught programs, JLPT N5 is usually the minimum entry requirement. For English-taught programs, IELTS or TOEFL is required.' },
                { q: 'What is the role of a Sponsor?', a: 'A financial sponsor (usually a parent or close relative) must prove they have sufficient funds to cover your tuition and living expenses, typically showing a bank balance of NPR 25-30 Lakhs and stable income.' },
                { q: 'Can I work part-time?', a: 'Yes, with a work permit (Shikakugai Kyoka), you can work up to 28 hours per week during school and full-time during vacations.' }
            ],
            requirementsByLevel: {
                '+2': 'GPA 2.4+, JLPT N5 or NAT-TEST 5Q (min 150 hours of Japanese study).',
                'Bachelor': 'GPA 2.4+, JLPT N2 (for Japanese programs) or IELTS 6.0+ (for English programs).',
                'Master': 'Bachelor degree, JLPT N2/N1 or IELTS 6.5+. Research plan required.',
                'PhD': 'Masters degree, Research background, Find a supervisor.'
            },
            docsChecklistByLevel: {
                '+2': ['Transcripts', 'Japanese Lang. Cert', 'Passport', 'Sponsor Income Proof', 'Relationship Cert'],
                'Bachelor': ['Transcripts (+2)', 'JLPT/NAT-TEST Score', 'Passport', 'COE', 'Sponsor Documents'],
                'Master': ['Transcripts (Bachelor)', 'Research Plan', 'IELTS/JLPT', 'Passport', 'CV'],
                'PhD': ['Transcripts (Master)', 'Research Proposal', 'Supervisor Acceptance', 'Passport']
            },
            image: '/japan_study_abroad_image_1773852842335.png'
        },
        {
            name: 'Netherlands',
            slug: 'netherlands',
            heroTitle: 'Innovative Learning in the Netherlands',
            featured: false,
            overview: 'The Netherlands offers a wide range of English-taught programs and an interactive teaching style.',
            scholarships: 'Holland Scholarship, Orange Tulip Scholarship.',
            timeline: 'September is the main intake. Deadlines are often in January/April. Apply via Studielink.',
            faqs: [
                { q: 'What is Studielink?', a: 'Studielink is the central application and registration system for higher education in the Netherlands.' },
                { q: 'Conditional vs Unconditional?', a: 'A conditional offer means you still need to meet some requirements (e.g., final grades or English score). An unconditional offer means you are fully accepted.' },
                { q: 'What is MVV?', a: 'An MVV is a provisional residence permit that allows you to enter the Netherlands for studies. Your university usually handles most of the application for you.' },
                { q: 'Is Health Insurance mandatory?', a: 'Yes, all residents must have health insurance. International students usually get private insurance until they start working.' }
            ],
            requirementsByLevel: {
                '+2': 'VWO equivalent (A-levels/Equivalent), IELTS 6.0 (no band less than 6.0).',
                'Bachelor': 'GPA 2.8+, IELTS 6.0-6.5. Strong motivation essay required.',
                'Master': 'Bachelor degree, GPA 3.0+, IELTS 6.5/7.0. Some research universities require GRE/GMAT.',
                'PhD': 'Master Degree, High research potential. PhDs are usually treated as employees.'
            },
            docsChecklistByLevel: {
                '+2': ['Transcripts', 'IELTS Scorecard', 'Passport', 'Financial Proof', 'SOP'],
                'Bachelor': ['Transcripts (+2)', 'IELTS', 'SOP', 'CV', 'Passport', 'Financial Proof'],
                'Master': ['Degree', 'Transcripts (Bachelor)', 'IELTS', 'SOP', 'CV', 'LOR', 'Passport', 'Motivation Letter'],
                'PhD': ['Master Degree', 'CV', 'Research background background', 'Passport', 'Reference Letters']
            },
            image: '/netherlands_study_abroad_image_1773852875581.png'
        },
        {
            name: 'South Korea',
            slug: 'south-korea',
            heroTitle: 'The Cultural Wave: Study in South Korea',
            featured: false,
            overview: 'South Korea is becoming an increasingly popular destination for its quality education and dynamic culture.',
            scholarships: 'Global Korea Scholarship (GKS).',
            timeline: 'Spring (March) and Fall (September) intakes. Apply 4-6 months earlier.',
            faqs: [
                { q: 'What is TOPIK?', a: 'The Test of Proficiency in Korean (TOPIK) is required for most Korean-taught programs. Level 3 is usually the minimum for admission.' },
                { q: 'What is a CoA?', a: 'A Certificate of Admission (CoA) is issued by the university after you are accepted and have paid the tuition. It is required for your D-2 visa.' },
                { q: 'What is a D-2 Visa?', a: 'The D-2 visa is the standard student visa for international students pursuing a degree in South Korea.' },
                { q: 'What is the role of a Sponsor?', a: 'For Nepali students, a sponsor (parent/relative) must show financial capacity (bank balance of $18,000-$20,000) for a year.' }
            ],
            requirementsByLevel: {
                '+2': 'GPA 2.8+ or 80%+, TOPIK 3 or IELTS 5.5+ for English tracks.',
                'Bachelor': 'GPA 2.5+, TOPIK 3-4 or IELTS 6.0+. Recommendation letters required.',
                'Master': 'Bachelor Degree, GPA 3.0+, TOPIK 4 or IELTS 6.5+. Published research is a plus.',
                'PhD': 'Master Degree, GPA 3.5+, TOPIK 4-5 or IELTS 6.5+. Detailed research proposal needed.'
            },
            docsChecklistByLevel: {
                '+2': ['Transcripts', 'Passport', 'SOP', 'Sponsor Financial Docs', 'Apostilled/Verified Docs'],
                'Bachelor': ['Transcripts (+2)', 'TOPIK/IELTS Score', 'SOP', 'LOR', 'Passport', 'Financial Proof'],
                'Master': ['Transcripts (Bachelor)', 'Degree Certificate', 'SOP', 'LOR', 'CV', 'Passport', 'Relationship Cert'],
                'PhD': ['Transcripts (Master)', 'Research Proposal', 'LOR', 'CV', 'Passport', 'Publications']
            },
            image: '/south_korea_study_abroad_image_1773853100360.png'
        }
    ];

    for (const country of countries) {
        await prisma.country.upsert({
            where: { slug: country.slug },
            update: country,
            create: country,
        });
    }

    console.log('Seed data created successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
