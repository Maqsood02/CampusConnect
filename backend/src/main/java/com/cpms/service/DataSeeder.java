package com.cpms.service;

import com.cpms.model.*;
import com.cpms.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PlacementOfficerRepository officerRepository;
    private final CompanyRepository companyRepository;
    private final RecruitmentDriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final InterviewRepository interviewRepository;
    private final NotificationRepository notificationRepository;
    private final PlacementRecordRepository placementRecordRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      StudentRepository studentRepository,
                      PlacementOfficerRepository officerRepository,
                      CompanyRepository companyRepository,
                      RecruitmentDriveRepository driveRepository,
                      ApplicationRepository applicationRepository,
                      InterviewRepository interviewRepository,
                      NotificationRepository notificationRepository,
                      PlacementRecordRepository placementRecordRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.officerRepository = officerRepository;
        this.companyRepository = companyRepository;
        this.driveRepository = driveRepository;
        this.applicationRepository = applicationRepository;
        this.interviewRepository = interviewRepository;
        this.notificationRepository = notificationRepository;
        this.placementRecordRepository = placementRecordRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already initialized with users. Skipping seeding.");
            return;
        }

        log.info("Seeding MongoDB collections with CPMS initial demo data...");

        String passwordHash = passwordEncoder.encode("Password123!");

        // 1. Seed Administrator
        User adminUser = userRepository.save(User.builder()
                .email("admin@cpms.edu")
                .passwordHash(passwordHash)
                .role(Role.ROLE_ADMIN)
                .active(true)
                .profileImageUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80")
                .createdAt(Instant.now())
                .build());

        // 2. Seed Placement Officer
        User officerUser = userRepository.save(User.builder()
                .email("officer@cpms.edu")
                .passwordHash(passwordHash)
                .role(Role.ROLE_OFFICER)
                .active(true)
                .profileImageUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80")
                .createdAt(Instant.now())
                .build());

        officerRepository.save(PlacementOfficer.builder()
                .userId(officerUser.getId())
                .email(officerUser.getEmail())
                .fullName("Prof. Sarah Jenkins")
                .department("Training & Placement Cell")
                .phone("+91 98765 43210")
                .officerCode("TPO-HQ-01")
                .avatarUrl(officerUser.getProfileImageUrl())
                .createdAt(Instant.now())
                .build());

        // 3. Seed Students
        User studentUser1 = userRepository.save(User.builder()
                .email("student@cpms.edu")
                .passwordHash(passwordHash)
                .role(Role.ROLE_STUDENT)
                .active(true)
                .profileImageUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80")
                .createdAt(Instant.now())
                .build());

        Student alex = studentRepository.save(Student.builder()
                .userId(studentUser1.getId())
                .rollNumber("2022CSE042")
                .fullName("Alex Mercer")
                .email(studentUser1.getEmail())
                .branch("CSE")
                .cgpa(9.15)
                .graduationYear(2026)
                .semester("7th Semester")
                .activeBacklogs(0)
                .phone("+91 98123 45678")
                .verificationStatus("VERIFIED")
                .avatarUrl(studentUser1.getProfileImageUrl())
                .skills(List.of(
                        Student.SkillItem.builder().name("Python").level("Advanced").build(),
                        Student.SkillItem.builder().name("React.js").level("Intermediate").build(),
                        Student.SkillItem.builder().name("MongoDB & SQL").level("Advanced").build(),
                        Student.SkillItem.builder().name("Docker & Cloud").level("Intermediate").build()
                ))
                .certifications(List.of(
                        Student.CertificationItem.builder().title("AWS Solutions Architect").issuer("Amazon Web Services").date("2025-06-15").build()
                ))
                .projects(List.of(
                        Student.ProjectItem.builder().title("Placement Orchestrator").tech("Java Spring Boot, MongoDB, React").desc("Automated eligibility filtering engine.").build()
                ))
                .createdAt(Instant.now())
                .build());

        // Seed Rahul Kumar
        User studentUser2 = userRepository.save(User.builder()
                .email("rahul.kumar@cpms.edu")
                .passwordHash(passwordHash)
                .role(Role.ROLE_STUDENT)
                .active(true)
                .profileImageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80")
                .createdAt(Instant.now())
                .build());

        Student rahul = studentRepository.save(Student.builder()
                .userId(studentUser2.getId())
                .rollNumber("2022CSE101")
                .fullName("Rahul Kumar")
                .email(studentUser2.getEmail())
                .branch("CSE")
                .cgpa(8.85)
                .graduationYear(2026)
                .semester("7th Semester")
                .activeBacklogs(0)
                .phone("+91 98111 22334")
                .verificationStatus("VERIFIED")
                .avatarUrl(studentUser2.getProfileImageUrl())
                .skills(List.of(
                        Student.SkillItem.builder().name("Java & Spring Boot").level("Advanced").build()
                ))
                .createdAt(Instant.now())
                .build());

        // 4. Seed Companies
        Company gCloud = companyRepository.save(Company.builder()
                .name("Google Cloud")
                .industry("Cloud & AI")
                .tier("Super Dream")
                .website("https://careers.google.com")
                .createdAt(Instant.now())
                .build());

        Company msft = companyRepository.save(Company.builder()
                .name("Microsoft")
                .industry("Enterprise Software")
                .tier("Super Dream")
                .website("https://careers.microsoft.com")
                .createdAt(Instant.now())
                .build());

        Company amzn = companyRepository.save(Company.builder()
                .name("Amazon")
                .industry("E-Commerce & AWS")
                .tier("Dream")
                .website("https://amazon.jobs")
                .createdAt(Instant.now())
                .build());

        Company techcorp = companyRepository.save(Company.builder()
                .name("TechCorp Labs")
                .industry("Enterprise SaaS")
                .tier("Core")
                .website("https://techcorp.io")
                .createdAt(Instant.now())
                .build());

        // 5. Seed Drives
        RecruitmentDrive drv1 = driveRepository.save(RecruitmentDrive.builder()
                .companyId(gCloud.getId())
                .companyName(gCloud.getName())
                .jobTitle("Cloud Solutions Engineer")
                .packageLpa(28.5)
                .location("Bengaluru / Hyderabad (Hybrid)")
                .driveDate("2026-09-24")
                .deadline("2026-09-20")
                .status("OPEN")
                .tier("Super Dream")
                .description("Design resilient cloud infrastructure and developer tooling on Google Cloud Platform.")
                .criteria(RecruitmentDrive.EligibilityCriteria.builder()
                        .minCgpa(8.5)
                        .allowedBranches(List.of("CSE", "IT", "ECE"))
                        .maxBacklogs(0)
                        .graduationYear(2026)
                        .requiredSkills(List.of("Python or Java", "Cloud Architecture", "Networks"))
                        .build())
                .createdAt(Instant.now())
                .build());

        RecruitmentDrive drv2 = driveRepository.save(RecruitmentDrive.builder()
                .companyId(msft.getId())
                .companyName(msft.getName())
                .jobTitle("Software Development Engineer (SDE-1)")
                .packageLpa(32.0)
                .location("Hyderabad / Noida")
                .driveDate("2026-09-28")
                .deadline("2026-09-22")
                .status("OPEN")
                .tier("Super Dream")
                .description("Core engineering on Azure, Teams, and AI copilot services.")
                .criteria(RecruitmentDrive.EligibilityCriteria.builder()
                        .minCgpa(8.0)
                        .allowedBranches(List.of("CSE", "IT"))
                        .maxBacklogs(0)
                        .graduationYear(2026)
                        .requiredSkills(List.of("Data Structures", "OOP", "System Design"))
                        .build())
                .createdAt(Instant.now())
                .build());

        // 6. Seed Applications with multi-stage timeline
        List<Application.StageEvent> app1History = new ArrayList<>();
        app1History.add(new Application.StageEvent("APPLIED", "2026-09-02T10:00:00Z", "Application submitted and verified against criteria."));
        app1History.add(new Application.StageEvent("SHORTLISTED", "2026-09-04T14:30:00Z", "Online assessment cleared with 100 percentile score."));

        Application app1 = applicationRepository.save(Application.builder()
                .driveId(drv1.getId())
                .studentId(alex.getId())
                .studentName(alex.getFullName())
                .rollNumber(alex.getRollNumber())
                .branch(alex.getBranch())
                .cgpa(alex.getCgpa())
                .jobTitle(drv1.getJobTitle())
                .companyName(drv1.getCompanyName())
                .packageLpa(drv1.getPackageLpa())
                .applicationDate("2026-09-04")
                .status("SHORTLISTED")
                .stage("TECHNICAL_ROUND")
                .feedback("Online assessment cleared with 100 percentile score. Shortlisted for Technical Round 1.")
                .stageHistory(app1History)
                .createdAt(Instant.now())
                .build());

        // 7. Seed Interviews with mode, panel, and evaluation
        interviewRepository.save(Interview.builder()
                .applicationId(app1.getId())
                .driveId(drv1.getId())
                .studentId(alex.getId())
                .candidateName(alex.getFullName())
                .companyName(drv1.getCompanyName())
                .jobTitle(drv1.getJobTitle())
                .roundName("Technical System Design Round")
                .roundNumber(1)
                .scheduledTime("2026-09-12T14:30:00")
                .locationOrLink("https://meet.google.com/cpms-interview-gcloud")
                .mode("VIRTUAL")
                .interviewerName("Google Cloud Architecture Panel")
                .status("SCHEDULED")
                .remarks("Prepare distributed system case studies and cloud networking basics.")
                .createdAt(Instant.now())
                .build());

        // 8. Seed Placement Records with offer letters
        placementRecordRepository.save(PlacementRecord.builder()
                .studentId(alex.getId())
                .studentName(alex.getFullName())
                .rollNumber(alex.getRollNumber())
                .branch(alex.getBranch())
                .cgpa(alex.getCgpa())
                .email(alex.getEmail())
                .phone(alex.getPhone())
                .companyId(techcorp.getId())
                .companyName(techcorp.getName())
                .jobTitle("Full-Stack Software Engineer")
                .packageLpa(14.5)
                .baseSalary(12.0)
                .joiningBonus(2.5)
                .tier("Core")
                .workLocation("Bengaluru (Hybrid)")
                .offerDate("2026-09-02")
                .joiningDate("2026-07-01")
                .offerLetterUrl("https://cpms.edu/docs/offers/alex_mercer_techcorp_offer.pdf")
                .status("ACCEPTED")
                .verificationStatus("VERIFIED")
                .verifiedBy("Prof. Sarah Jenkins")
                .remarks("Accepted offer letter and verified by Training & Placement Cell.")
                .createdAt(Instant.now())
                .build());

        placementRecordRepository.save(PlacementRecord.builder()
                .studentId(rahul.getId())
                .studentName(rahul.getFullName())
                .rollNumber(rahul.getRollNumber())
                .branch(rahul.getBranch())
                .cgpa(rahul.getCgpa())
                .email(rahul.getEmail())
                .phone(rahul.getPhone())
                .companyId(gCloud.getId())
                .companyName(gCloud.getName())
                .jobTitle("Cloud Solutions Engineer")
                .packageLpa(28.5)
                .baseSalary(22.0)
                .joiningBonus(6.5)
                .tier("Super Dream")
                .workLocation("Hyderabad")
                .offerDate("2026-09-06")
                .joiningDate("2026-08-01")
                .offerLetterUrl("https://cpms.edu/docs/offers/rahul_kumar_gcloud_offer.pdf")
                .status("OFFERED")
                .verificationStatus("VERIFIED")
                .verifiedBy("Prof. Sarah Jenkins")
                .remarks("Super Dream offer extended. Awaiting student acceptance.")
                .createdAt(Instant.now())
                .build());

        // 9. Seed Notifications
        notificationRepository.save(Notification.builder()
                .title("Welcome to CPMS Next-Gen")
                .message("Centralized institutional placement microservices active.")
                .type("general")
                .read(false)
                .createdAt(Instant.now())
                .build());

        log.info("MongoDB demo seeding completed successfully!");
    }
}
