"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ExpandableCard, { type CardProps } from "@/components/ui/expandable-card"

interface ProjectsSectionProps {
  setActiveSection: (section: string) => void
}

export default function ProjectsSection({ setActiveSection }: ProjectsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects: CardProps[] = [
    {
      title: "Goyang Lidah Jogja",
      description: "A culinary recommendation platform for Yogyakarta — think TripAdvisor, but for food. Built with Django and styled using Tailwind CSS.",
      tags: ["Django", "Flutter", "Dart", "Python", "Tailwind CSS"],
      src: "/goyang_lidah_jogja.png", 
      ctaText: "View on GitHub",
      ctaLink: "https://github.com/D-EZA-Kelompok5/goyang-lidah-jogja",
      content: () => (
        <>
          <p>
            GoyangLidahJogja adalah platform online yang dirancang untuk memudahkan Anda dalam menjelajahi, 
            menemukan, dan menikmati ragam kuliner terbaik yang ada di Yogyakarta. Kami menyediakan informasi 
            lengkap, rekomendasi akurat, dan ulasan jujur dari para pecinta kuliner dan komunitas lokal.
          </p>
          <p className="mt-4">Fitur Utama:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Informasi Seputar Event Kuliner:</strong> Admin dapat mambuat announcement tentang 
              informasi event kuliner yang bisa dilihat oleh customer dan pemilik resto.
              <br/>
              <span className="text-sm opacity-75">Dikerjakan oleh: Rakabima Ghaniendra Rusdianto</span>
            </li>
            <li>
              <strong>GoyangNanti:</strong> Fitur untuk menyimpan daftar restoran yang ingin dikunjungi 
              di masa depan (konsep seperti "wishlist").
              <br/>
              <span className="text-sm opacity-75">Dikerjakan oleh: Alyssa Layla Sasti</span>
            </li>
            <li>
              <strong>Ulasan Pengguna:</strong> Pengguna dapat membaca ulasan jujur dari komunitas 
              terkait pengalaman kuliner mereka.
              <br/>
              <span className="text-sm opacity-75">Dikerjakan oleh: Malvin Muhammad Raqin</span>
            </li>
            <li>
              <strong>Filter Pencarian:</strong> Pengguna dapat memfilter hasil pencarian berdasarkan tags.
              <br/>
              <span className="text-sm opacity-75">Dikerjakan oleh: Bersama</span>
            </li>
            <li>
              <strong>Kolom Announcement:</strong> Restaurant owner dapat memposting pengumuman khusus 
              terkait restoran mereka.
              <br/>
              <span className="text-sm opacity-75">Dikerjakan oleh: Farhan Dwi Putra</span>
            </li>
            <li>
              <strong>CRUD Menu:</strong> Restaurant owner dapat menambah, mengubah, dan menghapus menu 
              pada restoran.
              <br/>
              <span className="text-sm opacity-75">Dikerjakan oleh: Vissuta Gunawan Lim</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Solemates",
      description: "Software security project implementing comprehensive testing and OWASP Top 10 mitigations for an e-commerce platform.",
      tags: ["Python", "JavaScript", "HTML", "Shell", "Security"],
      src: "https://placehold.co/600x400?text=Solemates+Project",
      ctaText: "View on GitLab",
      ctaLink: "YOUR_GITHUB_LINK",
      content: () => (
        <>
          <p>
            Project mata kuliah Pengantar Keamanan Perangkat Lunak yang berfokus pada implementasi 
            unit testing dan mitigasi OWASP Top 10. Menggunakan e-commerce sebagai studi kasus untuk 
            menerapkan praktik keamanan modern dalam pengembangan web.
          </p>

          <p className="mt-4">Unit Testing & Security Coverage:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Test Coverage:</strong> 85% code coverage dengan 200+ unit tests
              <br/>
              <span className="text-sm opacity-75">Menggunakan PyTest dan Jest untuk backend dan frontend testing</span>
            </li>
            <li>
              <strong>Security Testing:</strong> Automated security tests untuk vulnerability scanning
              <br/>
              <span className="text-sm opacity-75">Integration dengan OWASP ZAP untuk dynamic testing</span>
            </li>
          </ul>

          <p className="mt-4">OWASP Top 10 Mitigations:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Broken Access Control:</strong> Implementasi role-based access control dan session management
            </li>
            <li>
              <strong>Cryptographic Failures:</strong> Proper password hashing dengan bcrypt dan data encryption
            </li>
            <li>
              <strong>Injection:</strong> Input validation dan parameterized queries untuk mencegah SQL injection
            </li>
            <li>
              <strong>Insecure Design:</strong> Secure by design principles dan threat modeling
            </li>
            <li>
              <strong>Security Misconfiguration:</strong> Secure headers dan proper error handling
            </li>
            <li>
              <strong>Vulnerable Components:</strong> Dependency scanning dan automated updates
            </li>
            <li>
              <strong>Authentication Failures:</strong> Multi-factor authentication dan session management
            </li>
            <li>
              <strong>Software & Data Integrity:</strong> Signature verification dan secure pipeline
            </li>
            <li>
              <strong>Security Logging:</strong> Comprehensive audit trails dan monitoring
            </li>
            <li>
              <strong>Server-Side Request Forgery:</strong> URL validation dan request filtering
            </li>
          </ul>

          <p className="mt-4">Tech Implementation:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Python backend dengan Django security middleware</li>
            <li>JavaScript frontend dengan security best practices</li>
            <li>Shell scripts untuk automated security testing</li>
            <li>CI/CD pipeline dengan security checks</li>
          </ul>
        </>
      ),
    },
    {
      title: "Papikos",
      description: "A comprehensive student housing platform built with Spring Boot for Advanced Programming course, featuring property listings and tenant management.",
      tags: ["Spring Boot", "HTML", "CSS", "MySQL", "Java"],
      src: "https://placehold.co/600x400?text=Papikos+Project",
      ctaText: "View on GitHub",
      ctaLink: "YOUR_GITHUB_LINK",
      content: () => (
        <>
          <p>
            PapiKos adalah platform manajemen kos-kosan yang dikembangkan sebagai bagian dari mata kuliah 
            Pemrograman Lanjut. Aplikasi ini memungkinkan pemilik kos untuk mengelola properti dan pencari 
            kos untuk menemukan tempat tinggal yang sesuai dengan kebutuhan mereka.
          </p>

          <p className="mt-4">Fitur Utama:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Property Management:</strong> CRUD operasi untuk pemilik kos dalam mengelola listing properti
              <br/>
              <span className="text-sm opacity-75">Includes: foto upload, detail kamar, dan manajemen harga</span>
            </li>
            <li>
              <strong>Booking System:</strong> Sistem pemesanan kamar kos dengan status tracking
              <br/>
              <span className="text-sm opacity-75">Features: booking confirmation, payment status</span>
            </li>
            <li>
              <strong>Search & Filter:</strong> Pencarian kos berdasarkan lokasi, harga, dan fasilitas
              <br/>
              <span className="text-sm opacity-75">Advanced filtering dengan multiple parameters</span>
            </li>
            <li>
              <strong>User Management:</strong> Multi-role system (Admin, Pemilik Kos, Pencari Kos)
              <br/>
              <span className="text-sm opacity-75">Role-based access control implementation</span>
            </li>
          </ul>

          <p className="mt-4">Technical Implementation:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Backend:</strong> Spring Boot with MVC architecture
              <br/>
              <span className="text-sm opacity-75">JPA/Hibernate for database operations</span>
            </li>
            <li>
              <strong>Frontend:</strong> Responsive design dengan HTML5 dan CSS3
              <br/>
              <span className="text-sm opacity-75">Bootstrap untuk komponen UI</span>
            </li>
            <li>
              <strong>Database:</strong> MySQL dengan relational data modeling
              <br/>
              <span className="text-sm opacity-75">Optimized queries dan indexing</span>
            </li>
            <li>
              <strong>Security:</strong> Spring Security untuk authentication & authorization
              <br/>
              <span className="text-sm opacity-75">Session management dan secure password handling</span>
            </li>
          </ul>
        </>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] max-w-4xl mx-auto"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="section-heading">Projects</h2>
        <p className="mb-12 opacity-80 max-w-2xl">
          A selection of my work. Each project represents a unique challenge and approach to creating meaningful digital
          experiences. Click on a project to learn more.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ExpandableCard cards={projects} />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-sm opacity-70 hover:opacity-100 interactive-element"
        onClick={() => setActiveSection("skills")}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
      >
        →view my skills
      </motion.button>
    </motion.div>
  )
}
