import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyMeem from './components/WhyMeem';
import ProductsGrid from './components/ProductsGrid';
import EcosystemHub from './components/EcosystemHub';
import Integrations from './components/Integrations';
import FeatureShowcase from './components/FeatureShowcase';
import { HRDashboard, FinanceDashboard, InvoiceDashboard } from './components/MiniDashboard';
import BusinessAndPOS from './components/BusinessAndPOS';
import Industries from './components/Industries';
import WorkTimeline from './components/WorkTimeline';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { hrFeatures, financeFeatures, einvoiceFeatures } from './data/content';
import GrowthPath from './components/GrowthPath';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <WhyMeem />
        <ProductsGrid />
        <EcosystemHub />
        <Integrations />

        <FeatureShowcase
          id="hr"
          eyebrow="MEEM HR"
          title="كل ما تحتاجه لإدارة موظفيك، في مكان واحد"
          desc="نظام HR متكامل يدير شؤون الموظفين والرواتب والمسيرات، والحضور والانصراف والتقييم، مصمم مع مراعاة المتطلبات السعودية، ويدعم التكامل مع أنظمة مثل قوى ومُدد وفق المتطلبات والإتاحة الفنية والتنظيمية."
          features={hrFeatures}
          cta="اكتشف ميم للموارد البشرية"
          visual={<HRDashboard />}
          tone="tint"
        />

        <FeatureShowcase
          eyebrow="MEEM Finance"
          title="أرقامك في مكان واحد"
          desc="إدارة مالية متكاملة تمنحك رؤية أوضح للحسابات، والمبيعات، والمشتريات، والمصروفات، والتقارير."
          features={financeFeatures}
          cta="اكتشف ميم للمالية"
          visual={<FinanceDashboard />}
          reverse
        />

        <FeatureShowcase
          eyebrow="ZATCA & E-Invoicing"
          title="جاهز لاحتياجات الفوترة الإلكترونية في المملكة"
          desc="تُصمم وظائف الفوترة في ميم للمالية وميم لنقاط البيع مع مراعاة متطلبات الفوترة الإلكترونية، مع بنية قابلة لدعم متطلبات الربط والتكامل الفنية المطبقة على المنشأة."
          features={einvoiceFeatures}
          cta="اكتشف الفوترة الإلكترونية"
          visual={<InvoiceDashboard />}
          tone="tint"
        />

        <BusinessAndPOS />
        <Industries />
        <WorkTimeline />
        <TechStack />
        <GrowthPath />
        <FAQ />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
