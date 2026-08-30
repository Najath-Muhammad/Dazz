import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Service from '../models/Service';
import { TRANSLATABLE_FIELDS } from '../utils/translatableFields';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const servicesData = [
  // ─── CATEGORY 1: Construction & Infrastructure (category: 'construction') ────
  {
    name: { en: 'Concrete Ready Mix Plants', ar: 'محطات الخرسانة الجاهزة' },
    slug: 'concrete-ready-mix-plants',
    category: 'construction',
    shortDescription: {
      en: 'Reliable Concrete. Consistent Quality. Delivered When It Matters.',
      ar: 'خرسانة موثوقة. جودة متسقة. تسليم في الوقت المحدد.'
    },
    icon: '🏗️',
    featured: true,
    displayOrder: 1,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'CONSTRUCTION & INFRASTRUCTURE', ar: 'المقاولات والبنية التحتية' },
      title: { en: 'Concrete Ready Mix Plants', ar: 'محطات الخرسانة الجاهزة' },
      subtitle: { en: 'Reliable Concrete. Consistent Quality. Delivered When It Matters.', ar: 'خرسانة موثوقة. جودة متسقة. تسليم في الوقت المحدد.' },
      description: {
        en: 'Dazz provides ready mix concrete solutions designed to support construction and infrastructure projects with reliable supply and consistent quality. Our concrete solutions are suited for a wide range of structural, commercial, industrial and infrastructure requirements.',
        ar: 'تقدم داز حلول خرسانة جاهزة مصممة لدعم مشاريع البناء والبنية التحتية بتوريد موثوق وجودة متسقة. تلاءم حلولنا الخرسانية مجموعة واسعة من المتطلبات الإنشائية والتجارية والصناعية والبنية التحتية.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Our Projects', ar: 'مشاريعنا' }, url: '/projects' }
    },
    introduction: {
      sectionLabel: { en: 'ABOUT THE SERVICE', ar: 'عن الخدمة' },
      title: { en: 'Concrete Ready Mix Plants & Supply', ar: 'محطات وتوريد الخرسانة الجاهزة' },
      mainDescription: {
        en: 'Dazz provides ready mix concrete solutions designed to support construction and infrastructure projects with reliable supply and consistent quality.',
        ar: 'تقدم داز حلول خرسانة جاهزة مصممة لدعم مشاريع البناء والبنية التحتية بتوريد موثوق وجودة متسقة.'
      },
      paragraphs: [
        {
          en: 'Our concrete operations focus on consistent quality production, project-tailored mix designs, and scheduled on-site delivery.',
          ar: 'تركز عملياتنا الخرسانية على إنتاج عالي الجودة وتصميم خلطات مخصصة للمشاريع وتوصيل مجدول في الموقع.'
        },
        {
          en: 'From foundations and structural works to roads, commercial developments, and large industrial facilities, we deliver dependable concrete supply.',
          ar: 'من الأساسات والأعمال الإنشائية إلى الطرق والتطوير التجاري والمنشآت الصناعية الكبيرة، نقدم توريد خرسانة موثوقاً.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Ready Mix Concrete Production', ar: 'إنتاج الخرسانة الجاهزة' }, description: { en: 'High-capacity production ensuring consistent specifications.', ar: 'إنتاج عالي السعة يضمن مواصفات متسقة.' } },
      { order: 2, title: { en: 'Customized Concrete Mixes', ar: 'خلطات خرسانية مخصصة' }, description: { en: 'Tailored mix designs engineered for specific strength and durability needs.', ar: 'تصاميم خلطات مخصصة مصممة لمتطلبات القوة والمتانة الخاصة.' } },
      { order: 3, title: { en: 'Concrete Supply & Delivery', ar: 'توريد وتوصيل الخرسانة' }, description: { en: 'Prompt on-site delivery utilizing transit mixer fleets.', ar: 'توصيل سريع في الموقع باستخدام أسطول خلاطات.' } },
      { order: 4, title: { en: 'Project-Based Concrete Solutions', ar: 'حلول خرسانية خاصة بالمشاريع' }, description: { en: 'Dedicated batching plant setups for major developments.', ar: 'إعداد محطات خلط مخصصة للمشاريع الكبرى.' } },
      { order: 5, title: { en: 'Scheduled Concrete Supply', ar: 'توريد الخرسانة المجدول' }, description: { en: 'Reliable delivery schedules aligned with pouring plans.', ar: 'جداول توريد موثوقة متوافقة مع خطط الصب.' } },
      { order: 6, title: { en: 'Large-Scale Project Support', ar: 'دعم المشاريع الضخمة' }, description: { en: 'Continuous pouring capability for massive infrastructure works.', ar: 'قدرة صب مستمر لأعمال البنية التحتية الضخمة.' } },
      { order: 7, title: { en: 'Quality-Controlled Production', ar: 'إنتاج خاضع لمراقبة الجودة' }, description: { en: 'Rigorous lab testing for compressive strength and slump testing.', ar: 'اختبارات معملية صارمة لقوة الضغط والهبوط.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Residential Projects', ar: 'المشاريع السكنية' }, description: { en: 'Villas, residential towers, and housing complexes.', ar: 'الفلل والأبراج السكنية والمجمعات السكنية.' } },
      { order: 2, title: { en: 'Commercial Buildings', ar: 'المباني التجارية' }, description: { en: 'Office towers, retail malls, and hospitality developments.', ar: 'أبراج المكاتب والمراكز التجارية والمنشآت الفندقية.' } },
      { order: 3, title: { en: 'Industrial Facilities', ar: 'المنشآت الصناعية' }, description: { en: 'Heavy factories, warehouses, and logistics hubs.', ar: 'المصانع الثقيلة والمستودعات والمراكز اللوجستية.' } },
      { order: 4, title: { en: 'Infrastructure Projects', ar: 'مشاريع البنية التحتية' }, description: { en: 'Bridges, tunnels, ports, and utility corridors.', ar: 'الجسور والأنفاق والموانئ وممرات المرافق.' } },
      { order: 5, title: { en: 'Foundations & Structural Works', ar: 'الأساسات والأعمال الإنشائية' }, description: { en: 'Raft foundations, columns, beams, and slabs.', ar: 'الأساسات الشريطية والأعمدة والجسور والأسقف.' } },
      { order: 6, title: { en: 'Road & Civil Works', ar: 'الطرق والأعمال المدنية' }, description: { en: 'Concrete pavements, kerbs, and drainage structures.', ar: 'الرصف الخرساني والأرصفة وهياكل تصريف المياه.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Consistent Quality', ar: 'جودة متسقة' }, description: { en: 'Automated batching systems ensuring zero variation.', ar: 'أنظمة خلط آلية تضمن عدم وجود تفاوت.' } },
      { order: 2, title: { en: 'Reliable Supply', ar: 'توريد موثوق' }, description: { en: 'Uninterrupted supply chain for uninterrupted continuous pours.', ar: 'سلسلة إمداد مستمرة للصب المستمر.' } },
      { order: 3, title: { en: 'Timely Delivery', ar: 'تسليم في الوقت المحدد' }, description: { en: 'GPS-tracked transit mixers ensure exact site arrival times.', ar: 'خلاطات مجهزة بنظام GPS تضمن الوصول بدقة للموقع.' } },
      { order: 4, title: { en: 'Project Coordination', ar: 'تنسيق المشاريع' }, description: { en: 'Dedicated technical support engineers assigned to your project.', ar: 'مهندسو دعم فني مخصصون لمشروعك.' } },
      { order: 5, title: { en: 'Quality-Focused Operations', ar: 'عمليات تركز على الجودة' }, description: { en: 'Certified raw materials meeting international standards.', ar: 'مواد خام معتمدة تلبي المعايير الدولية.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Project Requirement Assessment', ar: 'تقييم متطلبات المشروع' }, description: { en: 'Reviewing mix specs and site pour schedule.', ar: 'مراجعة مواصفات الخلطة وجدول صب الموقع.' } },
      { order: 2, stepNumber: 2, title: { en: 'Concrete Mix Planning', ar: 'تخطيط خلطة الخرسانة' }, description: { en: 'Engineering trial mixes tailored for strength and workability.', ar: 'هندسة خلطات تجريبية مخصصة للقوة وإمكانية التشغيل.' } },
      { order: 3, stepNumber: 3, title: { en: 'Production', ar: 'الإنتاج' }, description: { en: 'Computerized batching at fully automated plant facilities.', ar: 'الخلط الحاسوبي في محطات كاملة الأتمتة.' } },
      { order: 4, stepNumber: 4, title: { en: 'Quality Control', ar: 'مراقبة الجودة' }, description: { en: 'Slump testing and cube sampling prior to dispatch.', ar: 'اختبار الهبوط واعتينات المكعبات قبل الإرسال.' } },
      { order: 5, stepNumber: 5, title: { en: 'Delivery Coordination', ar: 'تنسيق التوصيل' }, description: { en: 'Dispatching transit mixers according to pour speed.', ar: 'إرسال الخلاطات وفقاً لسرعة الصب.' } },
      { order: 6, stepNumber: 6, title: { en: 'Site Delivery', ar: 'التوصيل في الموقع' }, description: { en: 'Discharging concrete directly into pumps or site forms.', ar: 'تفريغ الخرسانة مباشرة في المضخات أو القوالب.' } }
    ],
    cta: {
      title: { en: 'Building Stronger Foundations', ar: 'بناء أساسات أكثر قوة' },
      description: {
        en: 'Reliable concrete solutions designed to support projects from foundation to completion.',
        ar: 'حلول خرسانية موثوقة مصممة لدعم المشاريع من الأساس حتى الإنجاز.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Piling and DTH Drilling', ar: 'الخوازيق والحفر باستخدام DTH' },
    slug: 'piling-and-dth-drilling',
    category: 'construction',
    shortDescription: {
      en: 'Precision Drilling. Strong Foundations. Reliable Performance.',
      ar: 'حفر دقيق. أساسات قوية. أداء موثوق.'
    },
    icon: '⚙️',
    featured: true,
    displayOrder: 2,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'equipment', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'equipment', 'cta'],
    hero: {
      eyebrow: { en: 'CONSTRUCTION & INFRASTRUCTURE', ar: 'المقاولات والبنية التحتية' },
      title: { en: 'Piling and DTH Drilling', ar: 'الخوازيق والحفر باستخدام DTH' },
      subtitle: { en: 'Precision Drilling. Strong Foundations. Reliable Performance.', ar: 'حفر دقيق. أساسات قوية. أداء موثوق.' },
      description: {
        en: 'Dazz provides piling and Down-The-Hole (DTH) drilling solutions for construction, foundation and infrastructure requirements. Our drilling capabilities are designed to support projects requiring dependable ground and foundation solutions.',
        ar: 'تقدم داز حلول الخوازيق والحفر أسفل الثقب (DTH) لمتطلبات البناء والأساسات والبنية التحتية. مصممة لدعم المشاريع التي تطلب حلول أرضية وأساسات موثوقة.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'View Equipment', ar: 'عرض المعدات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'FOUNDATION ENGINEERING', ar: 'هندسة الأساسات' },
      title: { en: 'Precision Piling & DTH Drilling Solutions', ar: 'حلول الخوازيق وحفر DTH الدقيقة' },
      mainDescription: {
        en: 'Dazz provides piling and Down-The-Hole (DTH) drilling solutions for construction, foundation and infrastructure requirements.',
        ar: 'تقدم داز حلول الخوازيق والحفر أسفل الثقب (DTH) لمتطلبات البناء والأساسات والبنية التحتية.'
      },
      paragraphs: [
        {
          en: 'Our drilling capabilities are engineered to navigate challenging geological rock strata and deep foundation requirements across Saudi Arabia.',
          ar: 'تم هندسة قدرات الحفر لدينا للتعامل مع الطبقات الصخرية الصعبة ومتطلبات الأساسات العميقة عبر المملكة العربية السعودية.'
        },
        {
          en: 'We combine experienced rig operators with heavy-duty drilling rigs to ensure strong foundation integrity for heavy structures.',
          ar: 'نجمع بين مشغلي الحفارات ذوي الخبرة وحفارات شديدة التحمل لضمان سلامة الأساسات القوية للهياكل الثقيلة.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Piling Works', ar: 'أعمال الخوازيق' }, description: { en: 'Bored piling, sheet piling, and secant pile walls.', ar: 'الخوازيق المصبوبة في الموقع والشيت بايل والجدران المتقاطعة.' } },
      { order: 2, title: { en: 'DTH Drilling', ar: 'حفر DTH' }, description: { en: 'Down-the-hole hammer drilling in hard rock strata.', ar: 'الحفر بمطرقة أسفل الثقب في الطبقات الصخرية الصلبة.' } },
      { order: 3, title: { en: 'Foundation Drilling', ar: 'حفر الأساسات' }, description: { en: 'Deep socket foundation drilling for structural loads.', ar: 'حفر التجاويف العميقة للأساسات الإنشائية.' } },
      { order: 4, title: { en: 'Rock Drilling', ar: 'حفر الصخور' }, description: { en: 'High-penetration drilling through basalt, granite, and limestone.', ar: 'حفر عالي التغلغل في البازلت والجرانيت والحجر الجيري.' } },
      { order: 5, title: { en: 'Borehole Drilling', ar: 'حفر الآبار' }, description: { en: 'Geotechnical testing boreholes and dewatering holes.', ar: 'حفر آبار الاختبارات الجيوتقنية وآبار سحب المياه.' } },
      { order: 6, title: { en: 'Deep Foundation Support', ar: 'دعم الأساسات العميقة' }, description: { en: 'Underpinning and deep soil stabilization solutions.', ar: 'تدعيم الأساسات وتثبيت التربة العميقة.' } },
      { order: 7, title: { en: 'Site Drilling Operations', ar: 'عمليات الحفر بالموقع' }, description: { en: 'Turnkey site drilling execution with mobile rig fleets.', ar: 'تنفيذ أعمال الحفر المتكاملة بالموقع بواسطة أسطول الحفارات.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Building Foundations', ar: 'أساسات المباني' }, description: { en: 'High-rise tower pile foundations.', ar: 'أساسات الخوازيق للأبراج العالية.' } },
      { order: 2, title: { en: 'Infrastructure Projects', ar: 'مشاريع البنية التحتية' }, description: { en: 'Highways, railways, and utility pile supports.', ar: 'دعم الخوازيق للطرق السريعة والسكك الحديدية.' } },
      { order: 3, title: { en: 'Industrial Projects', ar: 'المشاريع الصناعية' }, description: { en: 'Refinery, chemical plant, and factory foundations.', ar: 'أساسات المصافي والمصانع الكيميائية.' } },
      { order: 4, title: { en: 'Heavy Structures', ar: 'الهياكل الثقيلة' }, description: { en: 'Silos, power plants, and marine structures.', ar: 'الصوامع ومحطات الطاقة والهياكل البحرية.' } },
      { order: 5, title: { en: 'Bridge Projects', ar: 'مشاريع الجسور' }, description: { en: 'Bridge pier piling and abutment drilling.', ar: 'خوازيق دعامات الجسور وحفر الأكتاف.' } },
      { order: 6, title: { en: 'Foundation Development', ar: 'تطوير الأساسات' }, description: { en: 'Excavation shoring and slope stabilization.', ar: 'تدعيم الجوانب وتثبيت المنحدرات.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Precision', ar: 'الدقة' }, description: { en: 'Exact verticality and diameter alignment in all boreholes.', ar: 'استقامة عمودية ودقة أقطار كاملة في جميع الآبار.' } },
      { order: 2, title: { en: 'Reliable Operations', ar: 'عمليات موثوقة' }, description: { en: 'Minimal downtime with maintained drill equipment.', ar: 'أقل فترة توقف مع معدات حفر تمت صيانتها.' } },
      { order: 3, title: { en: 'Efficient Drilling', ar: 'حفر كفء' }, description: { en: 'High air volume DTH hammers for fast meters-per-hour rate.', ar: 'مطاطق DTH بخواء عالي لمعدل أمتار سريع بالساعة.' } },
      { order: 4, title: { en: 'Strong Foundation Support', ar: 'دعم أساسات قوي' }, description: { en: 'Engineering compliance for heavy load bearing requirements.', ar: 'التزام هندسي لمتطلبات تحمل الأحمال الثقيلة.' } },
      { order: 5, title: { en: 'Project-Focused Solutions', ar: 'حلول تركز على المشروع' }, description: { en: 'Custom rig selection based on site geology and depth.', ar: 'اختيار مخصص للحفارات بناءً على جيولوجيا الموقع والعمق.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Site Assessment', ar: 'تقييم الموقع' }, description: { en: 'Analyzing soil survey report and foundation drawing specifications.', ar: 'تحليل تقرير فحص التربة ومواصفات مخططات الأساسات.' } },
      { order: 2, stepNumber: 2, title: { en: 'Site Preparation', ar: 'تجهيز الموقع' }, description: { en: 'Leveling rig access paths and marking pile coordinates.', ar: 'تسوية مسارات الحفارات وتحديد إحداثيات الخوازيق.' } },
      { order: 3, stepNumber: 3, title: { en: 'Drilling Operations', ar: 'عمليات الحفر' }, description: { en: 'Commencing rotary or DTH hammer drilling to target depth.', ar: 'بدء الحفر الدوار أو بمطرقة DTH للوصول للعمق المستهدف.' } },
      { order: 4, stepNumber: 4, title: { en: 'Borehole Formation', ar: 'تشكيل البئر' }, description: { en: 'Cleaning hole debris and placing protective casing if needed.', ar: 'تنظيف مخلفات البئر ووضع الأنابيب الواقية عند الحاجة.' } },
      { order: 5, stepNumber: 5, title: { en: 'Piling & Foundation Works', ar: 'أعمال الخوازيق والأساسات' }, description: { en: 'Lowering steel rebar cage and pouring concrete.', ar: 'أنزال قفص حديد التسليح وصب الخرسانة.' } },
      { order: 6, stepNumber: 6, title: { en: 'Site Inspection', ar: 'معاينة الموقع' }, description: { en: 'Performing integrity testing and pile head trimming.', ar: 'إجراء اختبارات السلامة وتكسير رؤوس الخوازيق.' } }
    ],
    equipment: [
      { order: 1, name: { en: 'DTH Drilling Rigs', ar: 'حفارات DTH' }, description: { en: 'Crawler mounted high-torque drilling rigs.', ar: 'حفارات مجنزرة ذات عزم دوران عالي.' }, specification: { en: 'Up to 300m depth capability', ar: 'قدرة عمق تصل إلى 300 متر' } },
      { order: 2, name: { en: 'DTH Hammers', ar: 'مطارق DTH' }, description: { en: 'Heavy-duty pneumatic percussive hammers.', ar: 'مطارق طرقية نيوماتيكية شديدة التحمل.' }, specification: { en: '4" to 12" hammer diameter range', ar: 'قطر مطرقة من 4 إلى 12 بوصة' } },
      { order: 3, name: { en: 'Drill Rods & Bits', ar: 'أنابيب ورؤوس الحفر' }, description: { en: 'Tungsten carbide button bits for rock cutting.', ar: 'رؤوس أزرار كربيد التنجستن لقطع الصخور.' }, specification: { en: 'High wear resistance steel alloy', ar: 'سبائك صلب عالية المقاومة للتآكل' } },
      { order: 4, name: { en: 'Air Compressors', ar: 'ضواغط الهواء' }, description: { en: 'High-pressure diesel portable air compressors.', ar: 'ضواغط هواء محمولة بضغط عالي تعمل بالديزل.' }, specification: { en: '900 CFM - 1200 CFM @ 25 bar', ar: '900 - 1200 قدم مكعب/دقيقة عند 25 بار' } }
    ],
    cta: {
      title: { en: 'Engineered for Stronger Foundations', ar: 'مصممة لأساسات أكثر قوة' },
      description: {
        en: 'Dependable piling and drilling solutions for demanding construction and infrastructure requirements.',
        ar: 'حلول خوازيق وحفر موثوقة لمتطلبات البناء والبنية التحتية الشاقة.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Construction Equipments', ar: 'معدات البناء' },
    slug: 'construction-equipments',
    category: 'construction',
    shortDescription: {
      en: 'The Equipment Your Project Needs.',
      ar: 'المعدات التي يحتاجها مشروعك.'
    },
    icon: '🚜',
    featured: true,
    displayOrder: 3,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'equipment', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'equipment', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'CONSTRUCTION & INFRASTRUCTURE', ar: 'المقاولات والبنية التحتية' },
      title: { en: 'Construction Equipments', ar: 'معدات البناء' },
      subtitle: { en: 'The Equipment Your Project Needs.', ar: 'المعدات التي يحتاجها مشروعك.' },
      description: {
        en: 'Dazz provides construction equipment solutions to support construction, infrastructure and industrial projects. We aim to connect projects with dependable equipment suited to their operational requirements.',
        ar: 'تقدم داز حلول معدات البناء لدعم مشاريع البناء والبنية التحتية والصناعة. نهدف لربط المشاريع بمعدات موثوقة تناسب متطلباتها التشغيلية.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Equipment Fleet', ar: 'أسطول المعدات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'HEAVY MACHINERY & FLEET', ar: 'المعدات الثقيلة والأسطول' },
      title: { en: 'Dependable Machinery for Heavy Construction', ar: 'معدات موثوقة للبناء الثقيل' },
      mainDescription: {
        en: 'Dazz provides construction equipment solutions to support construction, infrastructure and industrial projects.',
        ar: 'تقدم داز حلول معدات البناء لدعم مشاريع البناء والبنية التحتية والصناعة.'
      },
      paragraphs: [
        {
          en: 'Our equipment supply services connect contractor job sites with well-maintained machinery operated by certified personnel.',
          ar: 'تربط خدمات توريد المعدات لدينا مواقع عمل المقاولين بآليات تمت صيانتها جيدا ويعمل عليها مشغلون معتمدون.'
        },
        {
          en: 'Whether you require short-term rental or long-term machinery support, we deliver flexible equipment mobilization.',
          ar: 'سواء كنت بحاجة إلى استئجار قصير الأجل أو دعم آليات طويل الأجل، فنحن نقدم توفيراً مرناً للمعدات.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Construction Equipment Supply', ar: 'توريد معدات البناء' }, description: { en: 'Comprehensive machinery supply for jobsite earthworks and lifting.', ar: 'توريد شامل للآليات لأعمال الحفر والرفع في مواقع العمل.' } },
      { order: 2, title: { en: 'Equipment Sourcing', ar: 'توفير المعدات' }, description: { en: 'Sourcing specialized machinery for unique project specifications.', ar: 'توفير آليات متخصصة بمواصفات فريدة للمشاريع.' } },
      { order: 3, title: { en: 'Equipment Selection', ar: 'اختيار المعدات' }, description: { en: 'Technical consultations to match machinery payload and capacity.', ar: 'استشارات فنية لمطابقة حمولة الآليات وسعتها.' } },
      { order: 4, title: { en: 'Project-Based Equipment Solutions', ar: 'حلول معدات خاصة بالمشاريع' }, description: { en: 'Dedicated equipment fleets deployed directly to site.', ar: 'أسطول معدات مخصص يتم نشره مباشرة بالموقع.' } },
      { order: 5, title: { en: 'Equipment Delivery Coordination', ar: 'تنسيق توصيل المعدات' }, description: { en: 'Lowbed heavy haulage transport directly to remote project sites.', ar: 'نقل ثقيل بالشاحنات المنخفضة مباشرة لمواقع المشاريع النائية.' } }
    ],
    equipment: [
      { order: 1, name: { en: 'Excavators', ar: 'الحفارات' }, description: { en: 'Tracked excavators for trenching and earthmoving.', ar: 'حفارات مجنزرة للحفر ونقل التربة.' }, specification: { en: '20 to 45 Ton class', ar: 'فئة 20 إلى 45 طن' } },
      { order: 2, name: { en: 'Wheel Loaders', ar: 'الشيولات' }, description: { en: 'Heavy wheel loaders for material aggregate loading.', ar: 'شيولات ثقيلة لتحميل المواد الركامية.' }, specification: { en: '3 to 6 m³ bucket capacity', ar: 'سعة دلو من 3 إلى 6 م³' } },
      { order: 3, name: { en: 'Bulldozers', ar: 'البلدوزرات' }, description: { en: 'Heavy crawlers for bulk earth leveling and land clearing.', ar: 'بلدوزرات ثقيلة لتسوية التربة وتنظيف الأراضي.' }, specification: { en: 'CAT D8 / D9 equivalent', ar: 'ما يعادل كاتربريلر D8 / D9' } },
      { order: 4, name: { en: 'Motor Graders', ar: 'الجريدرات' }, description: { en: 'Precision graders for road subbase leveling.', ar: 'جريدرات دقيقة لتسوية طبقات أساس الطرق.' }, specification: { en: '14ft moldboard width', ar: 'عرض شفرة 14 قدم' } },
      { order: 5, name: { en: 'Cranes', ar: 'الرافعات (الكرينات)' }, description: { en: 'Mobile all-terrain and crawler cranes for structural lifting.', ar: 'رافعات متحرركة وشبكية للرفع الإنشائي.' }, specification: { en: '50 Ton to 250 Ton capacity', ar: 'سعة من 50 طن إلى 250 طن' } },
      { order: 6, name: { en: 'Compactors & Rollers', ar: 'المداحل والرصاصات' }, description: { en: 'Vibratory soil compactors and asphalt rollers.', ar: 'مداحل تربة اهتزازية ورصاصات أسفلت.' }, specification: { en: '10 to 15 Ton single drum', ar: 'أسطوانة مفردة من 10 إلى 15 طن' } },
      { order: 7, name: { en: 'Generators', ar: 'المولدات' }, description: { en: 'Heavy-duty industrial power generators.', ar: 'مولدات طاقة صناعية شديدة التحمل.' }, specification: { en: '100 kVA to 1250 kVA soundproof', ar: 'من 100 إلى 1250 ك.ف.أ عازلة للصوت' } },
      { order: 8, name: { en: 'Concrete Equipment', ar: 'معدات الخرسانة' }, description: { en: 'Boom pumps and stationary concrete pumps.', ar: 'مضخات خرسانة ذات ذراع ومضخات ثابتة.' }, specification: { en: '36m to 56m reach booms', ar: 'أذرع وصول من 36م إلى 56م' } }
    ],
    applications: [
      { order: 1, title: { en: 'Construction Projects', ar: 'مشاريع البناء' }, description: { en: 'Building structure lifting and excavation.', ar: 'رفع المباني والحفر الإنشائي.' } },
      { order: 2, title: { en: 'Infrastructure Projects', ar: 'مشاريع البنية التحتية' }, description: { en: 'Heavy earthworks for highways and railways.', ar: 'أعمال تربة ثقيلة للطرق السريعة والسكك الحديدية.' } },
      { order: 3, title: { en: 'Road Works', ar: 'أعمال الطرق' }, description: { en: 'Subbase compaction and asphalt paving support.', ar: 'دمك طبقات الأساس ودعم رصف الأسفلت.' } },
      { order: 4, title: { en: 'Earthworks & Land Clearing', ar: 'أعمال التربة وتنظيف الموقع' }, description: { en: 'Mass excavation and site grading.', ar: 'حفر ضخم وتسوية مواقع.' } },
      { order: 5, title: { en: 'Site Development', ar: 'تطوير المواقع' }, description: { en: 'Utility trenching and pad preparation.', ar: 'حفر ممرات المرافق وتجهيز القواعد.' } },
      { order: 6, title: { en: 'Industrial Projects', ar: 'المشاريع الصناعية' }, description: { en: 'Refinery maintenance and heavy plant erection.', ar: 'صيانة المصافي وتركيب المصانع الثقيلة.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Reliable Equipment', ar: 'معدات موثوقة' }, description: { en: 'Modern, low-hour machines from top global brands.', ar: 'آليات حديثة بساعات عمل قليلة من ماركات عالمية.' } },
      { order: 2, title: { en: 'Wide Equipment Selection', ar: 'تشكيلة واسعة من المعدات' }, description: { en: 'One-stop rental fleet for all heavy construction needs.', ar: 'أسطول متنوع لجميع احتياجات البناء الثقيل.' } },
      { order: 3, title: { en: 'Project-Focused Solutions', ar: 'حلول تركز على المشروع' }, description: { en: 'Flexible daily, monthly, or project duration terms.', ar: 'شروط مرنة يومية وشهرية أو حسب مدة المشروع.' } },
      { order: 4, title: { en: 'Flexible Supply', ar: 'توريد مرن' }, description: { en: 'Rapid equipment replacement in case of mechanical breakdown.', ar: 'استبدال سريع للمعدات في حالة الأعطال الميكانيكية.' } },
      { order: 5, title: { en: 'Timely Delivery', ar: 'تسليم في الوقت المحدد' }, description: { en: 'Prompt site mobilization via internal heavy haulage trailers.', ar: 'توفير سريع بالموقع عبر مقطورات النقل الثقيل.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Requirement Assessment', ar: 'تقييم المتطلبات' }, description: { en: 'Evaluating machine specifications and site job scope.', ar: 'تقييم مواصفات الآلات ونطاق العمل بالموقع.' } },
      { order: 2, stepNumber: 2, title: { en: 'Equipment Selection', ar: 'اختيار المعدات' }, description: { en: 'Matching machine tonnage and attachment features.', ar: 'مطابقة حمولة الآلات ومميزات الملحقات.' } },
      { order: 3, stepNumber: 3, title: { en: 'Equipment Sourcing', ar: 'توفير المعدات' }, description: { en: 'Preparing inspect-certified machinery from fleet.', ar: 'تجهيز آليات معتمدة ومفحوصة من الأسطول.' } },
      { order: 4, stepNumber: 4, title: { en: 'Supply Coordination', ar: 'تنسيق التوريد' }, description: { en: 'Scheduling lowbed trailer transit and site gate access.', ar: 'جدولة نقل الشاحنات المنخفضة وتصاريح دخول الموقع.' } },
      { order: 5, stepNumber: 5, title: { en: 'Project Delivery', ar: 'تسليم المشروع' }, description: { en: 'Handover machinery to site supervisor with operational signoff.', ar: 'تسليم الآليات لمشرف الموقع مع التوقيع التشغيلي.' } }
    ],
    cta: {
      title: { en: 'Equip Your Next Project', ar: 'جهّز مشروعك القادم' },
      description: {
        en: 'Construction equipment solutions aligned with your project\'s operational requirements.',
        ar: 'حلول معدات البناء المتوافقة مع المتطلبات التشغيلية لمشروعك.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Cement Trading', ar: 'تجارة الأسمنت' },
    slug: 'cement-trading',
    category: 'construction',
    shortDescription: {
      en: 'Reliable Cement Supply for Growing Projects.',
      ar: 'توريد أسمنت موثوق للمشاريع المتنامية.'
    },
    icon: '📦',
    featured: false,
    displayOrder: 4,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'CONSTRUCTION & INFRASTRUCTURE', ar: 'المقاولات والبنية التحتية' },
      title: { en: 'Cement Trading', ar: 'تجارة الأسمنت' },
      subtitle: { en: 'Reliable Cement Supply for Growing Projects.', ar: 'توريد أسمنت موثوق للمشاريع المتنامية.' },
      description: {
        en: 'Dazz provides cement trading and supply solutions for construction, infrastructure, industrial and related applications. Through dependable sourcing and supply coordination, we support projects that require consistent access to essential construction materials.',
        ar: 'تقدم داز حلول تجارة وتوريد الأسمنت للبناء والبنية التحتية والتطبيقات الصناعية. من خلال التوريد الموثوق نضمن وصولاً مستمراً لمواد البناء الأساسية.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Trading Details', ar: 'تفاصيل التجارة' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'RAW MATERIAL TRADING', ar: 'تجارة المواد الخام' },
      title: { en: 'Dependable Cement Trading & Bulk Supply', ar: 'تجارة وتوريد الأسمنت الموثوق بالسائب' },
      mainDescription: {
        en: 'Dazz provides cement trading and supply solutions for construction, infrastructure, industrial and related applications.',
        ar: 'تقدم داز حلول تجارة وتوريد الأسمنت للبناء والبنية التحتية والتطبيقات الصناعية.'
      },
      paragraphs: [
        {
          en: 'We source high-grade Ordinary Portland Cement (OPC), Sulfate Resistant Cement (SRC), and white cement directly from certified regional manufacturers.',
          ar: 'نوفر أسمنت بورتلاندي عادي (OPC) وأسمنت مقاوم للكبريتات (SRC) وأسمنت أبيض عالي الجودة مباشرة من مصنعين إقليميين معتمدين.'
        },
        {
          en: 'Our bulk logistics ensure continuous supply to ready mix plants, precast factories, and major infrastructure contractors.',
          ar: 'تضمن لوجستياتنا السائبة توريداً مستمراً لمحطات الخرسانة الجاهزة ومصانع الخرسانة المسبقة الصنع ومقاولي البنية التحتية.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Cement Sourcing', ar: 'توفير الأسمنت' }, description: { en: 'Direct sourcing from SACER and certified Saudi cement mills.', ar: 'توفير مباشر من مصانع الأسمنت السعودية المعتمدة.' } },
      { order: 2, title: { en: 'Cement Trading', ar: 'تجارة الأسمنت' }, description: { en: 'Domestic and international commercial trading arrangements.', ar: 'ترتيبات تجارة تجارية محلية ودولية.' } },
      { order: 3, title: { en: 'Cement Supply', ar: 'توريد الأسمنت' }, description: { en: 'Bagged cement (50kg) and bulk pneumatic tanker supply.', ar: 'أسمنت أكياس (50 كجم) وتوريد صهاريج سائبة.' } },
      { order: 4, title: { en: 'Bulk Cement Supply', ar: 'توريد الأسمنت السائب' }, description: { en: 'Dedicated silobas tanker deliveries directly to plant silos.', ar: 'توصيل صهاريج سيلوباس مخصصة لمقاطير النباتات مباشرة.' } },
      { order: 5, title: { en: 'Project-Based Supply', ar: 'توريد مخصص للمشاريع' }, description: { en: 'Long-term price locks and dedicated supply contracts for mega projects.', ar: 'تثبيت أسعار طويل الأجل وعقود توريد مخصصة للمشاريع الضخمة.' } },
      { order: 6, title: { en: 'Supply Coordination', ar: 'تنسيق التوريد' }, description: { en: 'Logistics tracking ensuring zero downtime at client batching plants.', ar: 'تتبع اللوجستيات لضمان عدم توقف العمل بمحطات خلط العملاء.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Construction Projects', ar: 'مشاريع البناء' }, description: { en: 'Structural concrete pouring and masonry mortar.', ar: 'صب الخرسانة الإنشائية ومونة البناء.' } },
      { order: 2, title: { en: 'Infrastructure', ar: 'البنية التحتية' }, description: { en: 'Highways, culverts, bridge abutments, and dams.', ar: 'الطرق السريعة والقنوات وعبارات الجسور والسدود.' } },
      { order: 3, title: { en: 'Industrial Projects', ar: 'المشاريع الصناعية' }, description: { en: 'Heavy industrial flooring and foundation slabs.', ar: 'الأرضيات الصناعية الثقيلة وبلاطات الأساسات.' } },
      { order: 4, title: { en: 'Ready Mix Plants', ar: 'محطات الخرسانة الجاهزة' }, description: { en: 'Bulk raw material supply for high-volume batching.', ar: 'توريد مواد خام سائبة للخلط عالي الحجم.' } },
      { order: 5, title: { en: 'Building Projects', ar: 'مشاريع المباني' }, description: { en: 'Residential housing developments and commercial complexes.', ar: 'المشاريع السكنية والمجمعات التجارية.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Reliable Sourcing', ar: 'توفير موثوق' }, description: { en: 'Direct partnerships with leading cement manufacturers.', ar: 'شراكات مباشرة مع كبار مصنعي الأسمنت.' } },
      { order: 2, title: { en: 'Consistent Supply', ar: 'توريد مستمر' }, description: { en: 'Guaranteed supply volume even during peak market demand.', ar: 'حجم توريد مضمون حتى خلال فترات الذروة.' } },
      { order: 3, title: { en: 'Quality-Focused Approach', ar: 'نهج يركز على الجودة' }, description: { en: 'Freshly manufactured cement meeting SASO and ASTM standards.', ar: 'أسمنت حديث التصنيع يطابق معايير SASO و ASTM.' } },
      { order: 4, title: { en: 'Timely Delivery', ar: 'تسليم في الوقت المحدد' }, description: { en: 'Dedicated silobas fleet for rapid delivery.', ar: 'أسطول صهاريج مخصص للتوصيل السريع.' } },
      { order: 5, title: { en: 'Project Support', ar: 'دعم المشاريع' }, description: { en: 'Flexible payment terms tailored for corporate contractors.', ar: 'شروط دفع مرنة مخصصة لمقاولي الشركات.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Requirement Identification', ar: 'تحديد المتطلبات' }, description: { en: 'Determining cement grade (OPC/SRC) and volume schedule.', ar: 'تحديد نوع الأسمنت (OPC/SRC) وجدول الكميات.' } },
      { order: 2, stepNumber: 2, title: { en: 'Cement Sourcing', ar: 'توفير الأسمنت' }, description: { en: 'Allocating production quota from regional cement plant.', ar: 'تخصيص حصة الإنتاج من مصنع الأسمنت الإقليمي.' } },
      { order: 3, stepNumber: 3, title: { en: 'Supplier Coordination', ar: 'تنسيق المورد' }, description: { en: 'Confirming loading schedule and quality test certs.', ar: 'تأكيد جدول التحميل وشهادات الفحص الفني.' } },
      { order: 4, stepNumber: 4, title: { en: 'Quality Verification', ar: 'التحقق من الجودة' }, description: { en: 'Inspecting bag integrity or bulk moisture levels.', ar: 'فحص سلامة الأكياس أو مستويات الرطوبة في السائب.' } },
      { order: 5, stepNumber: 5, title: { en: 'Supply & Delivery', ar: 'التوريد والتوصيل' }, description: { en: 'Offloading at client silos or warehouse storage.', ar: 'التفريغ في صوامع العملاء أو مستودعات التخزين.' } }
    ],
    cta: {
      title: { en: 'A Reliable Link in Your Supply Chain', ar: 'حلقة موثوقة في سلسلة التوريد الخاصة بك' },
      description: {
        en: 'Dependable cement sourcing and supply solutions for construction and infrastructure projects.',
        ar: 'حلول توفير وتوريد أسمنت موثوقة لمشاريع البناء والبنية التحتية.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  // ─── CATEGORY 2: Real Estate & Hospitality (category: 'hospitality') ────────
  {
    name: { en: 'Real Estate', ar: 'العقارات' },
    slug: 'real-estate',
    category: 'hospitality',
    shortDescription: {
      en: 'Building Opportunities. Creating Long-Term Value.',
      ar: 'بناء الفرص. خلق قيمة طويلة الأجل.'
    },
    icon: '🏢',
    featured: true,
    displayOrder: 5,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'REAL ESTATE & HOSPITALITY', ar: 'العقارات والضيافة' },
      title: { en: 'Real Estate Solutions', ar: 'الحلول العقارية' },
      subtitle: { en: 'Building Opportunities. Creating Long-Term Value.', ar: 'بناء الفرص. خلق قيمة طويلة الأجل.' },
      description: {
        en: "Dazz's real estate activities focus on opportunities across property development, investment and related real estate solutions. We aim to identify and support projects that contribute to sustainable growth and long-term value.",
        ar: 'تركز أنشطة داز العقارية على الفرص عبر التطوير العقاري والاستثمار والحلول العقارية ذات الصلة. نهدف إلى تحديد ودعم المشاريع التي تساهم في النمو المستدام والقيمة طويلة الأجل.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Explore Properties', ar: 'استكشاف العقارات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'PROPERTY & DEVELOPMENT', ar: 'العقارات والتطوير' },
      title: { en: 'Strategic Property Development & Investment', ar: 'التطوير والاستثمار العقاري الاستراتيجي' },
      mainDescription: {
        en: "Dazz's real estate activities focus on opportunities across property development, investment and related real estate solutions.",
        ar: 'تركز أنشطة داز العقارية على الفرص عبر التطوير العقاري والاستثمار والحلول العقارية ذات الصلة.'
      },
      paragraphs: [
        {
          en: 'We identify strategic prime land parcels and commercial assets that align with Saudi Arabia\'s Vision 2030 urban growth initiatives.',
          ar: 'نحدد قطع الأراضي المتميزة الاستراتيجية والأصول التجارية المتوافقة مع مبادرات النمو الحضري لرؤية السعودية 2030.'
        },
        {
          en: 'Our real estate division works with investors, landowners, and commercial enterprises to maximize property yield and long-term asset value.',
          ar: 'يعمل قسمنا العقاري مع المستثمرين وملاّك الأراضي والشركات التجارية لتعظيم العائد العقاري وقيمة الأصول طويلة الأجل.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Property Development', ar: 'التطوير العقاري' }, description: { en: 'End-to-end residential and commercial master planning.', ar: 'تخطيط شامل للمشاريع السكنية والتجارية.' } },
      { order: 2, title: { en: 'Real Estate Investment', ar: 'الاستثمار العقاري' }, description: { en: 'Capital allocation for high-yield real estate ventures.', ar: 'تخصيص رؤوس الأموال للمشاريع العقارية عالية العائد.' } },
      { order: 3, title: { en: 'Property Opportunities', ar: 'الفرص العقارية' }, description: { en: 'Identifying undervalue land acquisition opportunities.', ar: 'تحديد فرص الاستحواذ على الأراضي المتميزة.' } },
      { order: 4, title: { en: 'Real Estate Partnerships', ar: 'الشراكات العقارية' }, description: { en: 'Joint venture development structures for landowners.', ar: 'هياكل المشاريع المشتركة لملاّك الأراضي.' } },
      { order: 5, title: { en: 'Commercial Property Solutions', ar: 'حلول العقارات التجارية' }, description: { en: 'Office parks, retail strips, and logistics warehouse developments.', ar: 'مجمعات المكاتب والمراكز التجارية ومستودعات اللوجستيات.' } },
      { order: 6, title: { en: 'Residential Property Solutions', ar: 'حلول العقارات السكنية' }, description: { en: 'Gated residential communities and modern apartment complexes.', ar: 'مجمعات سكنية مغلقة ومجمعات شقق حديثة.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Residential Developments', ar: 'المشاريع السكنية' }, description: { en: 'Housing complexes, modern villas, and residential towers.', ar: 'مجمعات سكنية، فلل حديثة، وأبراج سكنية.' } },
      { order: 2, title: { en: 'Commercial Developments', ar: 'المشاريع التجارية' }, description: { en: 'Corporate headquarters, shopping centers, and business hubs.', ar: 'مقرات الشركات، المراكز التجارية، ومراكز الأعمال.' } },
      { order: 3, title: { en: 'Mixed-Use Projects', ar: 'المشاريع متعددة الاستخدامات' }, description: { en: 'Integrated live-work-play urban developments.', ar: 'مشاريع حضرية متكاملة للعيش والعمل والترفيه.' } },
      { order: 4, title: { en: 'Investment Opportunities', ar: 'الفرص الاستثمارية' }, description: { en: 'Yield-generating real estate funds and asset portfolios.', ar: 'صناديق ومحافظ عقارية مدرة للعوائد.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Strategic Opportunities', ar: 'فرص استراتيجية' }, description: { en: 'Data-driven market intelligence identifying high-growth corridors.', ar: 'رؤى سوقية قائمة على البيانات تحدد مسارات النمو العالي.' } },
      { order: 2, title: { en: 'Long-Term Perspective', ar: 'منظور طويل الأجل' }, description: { en: 'Sustainable development practices preserving future asset value.', ar: 'ممارسات تطوير مستدامة تحافظ على قيمة الأصول المستقبلي.' } },
      { order: 3, title: { en: 'Market-Focused Approach', ar: 'نهج يركز على السوق' }, description: { en: 'Designing developments aligned with demographic demand.', ar: 'تصميم مشاريع متوافقة مع الطلب الديموغرافي.' } },
      { order: 4, title: { en: 'Value Creation', ar: 'خلق القيمة' }, description: { en: 'Optimizing floor plate efficiency and rental yields.', ar: 'تحسين كفاءة مساحات الطوابق والعوائد الإيجارية.' } },
      { order: 5, title: { en: 'Professional Coordination', ar: 'تنسيق مهني' }, description: { en: 'Navigating municipal approvals, zoning, and title deeds.', ar: 'إدارة الموافقات البلدية والتنظيم وصكوك الملكية.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Market & Opportunity Assessment', ar: 'تقييم السوق والفرص' }, description: { en: 'Feasibility studies and highest-and-best-use site analysis.', ar: 'دراسات الجدوى وتحليل الاستخدام الأفضل والأعلى للموقع.' } },
      { order: 2, stepNumber: 2, title: { en: 'Project Evaluation', ar: 'تقييم المشروع' }, description: { en: 'Financial modeling, ROI projection, and risk mitigation.', ar: 'النمذجة المالية وتوقعات العائد وتقليل المخاطر.' } },
      { order: 3, stepNumber: 3, title: { en: 'Planning', ar: 'التخطيط' }, description: { en: 'Architectural master planning and municipal permit submission.', ar: 'التخطيط المعماري الرئيسي وتقديم تصاريح البلدية.' } },
      { order: 4, stepNumber: 4, title: { en: 'Development Coordination', ar: 'تنسيق التطوير' }, description: { en: 'Managing contractor bidding and construction phase execution.', ar: 'إدارة مناقصات المقاولين وتنفيذ مرحلة البناء.' } },
      { order: 5, stepNumber: 5, title: { en: 'Project Management', ar: 'إدارة المشروع' }, description: { en: 'Leasing, facility handover, and long-term asset management.', ar: 'التأجير، تسليم المرافق، وإدارة الأصول طويلة الأجل.' } }
    ],
    cta: {
      title: { en: 'Explore New Opportunities', ar: 'استكشف فرصاً جديدة' },
      description: {
        en: 'Discover real estate opportunities built around sustainable growth and long-term value.',
        ar: 'اكتشف فرصاً عقارية مبنية حول النمو المستدام والقيمة طويلة الأجل.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Travel and Tourism', ar: 'السفر والسياحة' },
    slug: 'travel-and-tourism',
    category: 'hospitality',
    shortDescription: {
      en: 'Discover Places. Create Experiences.',
      ar: 'اكتشف الأماكن. اصنع التجارب.'
    },
    icon: '✈️',
    featured: false,
    displayOrder: 6,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'REAL ESTATE & HOSPITALITY', ar: 'العقارات والضيافة' },
      title: { en: 'Travel and Tourism', ar: 'السفر والسياحة' },
      subtitle: { en: 'Discover Places. Create Experiences.', ar: 'اكتشف الأماكن. اصنع التجارب.' },
      description: {
        en: "Dazz's travel and tourism services aim to provide convenient and well-coordinated travel experiences for individuals, families, businesses and groups. Our approach focuses on making travel planning simple, organized and enjoyable.",
        ar: 'تهدف خدمات داز للسفر والسياحة إلى تقديم تجارب سفر مريحة ومنسقة للأفراد والعائلات والشركات والمجموعات.'
      },
      ctaPrimary: { text: { en: 'Plan Your Journey', ar: 'خطط لرحلتك' }, url: '/contact' },
      ctaSecondary: { text: { en: 'View Packages', ar: 'عرض الباقات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'TRAVEL & DESTINATION MANAGEMENT', ar: 'إدارة السفر والوجهات' },
      title: { en: 'Seamless Travel Planning & Tourism Experiences', ar: 'تخطيط سفر سلس وتجارب سياحية' },
      mainDescription: {
        en: "Dazz's travel and tourism services aim to provide convenient and well-coordinated travel experiences for individuals, families, businesses and groups.",
        ar: 'تهدف خدمات داز للسفر والسياحة إلى تقديم تجارب سفر مريحة ومنسقة للأفراد والعائلات والشركات والمجموعات.'
      },
      paragraphs: [
        {
          en: 'We curate bespoke travel itineraries, corporate travel logistics, and VIP destination management across Saudi Arabia and international hotspots.',
          ar: 'نبتكر برامج سفر مخصصة ولوجستيات سفر الشركات وإدارة وجهات لكبار الشخصيات عبر السعودية والوجهات العالمية.'
        },
        {
          en: 'From Umrah travel packages and historical heritage tours to corporate retreats and leisure holidays, we handle every detail.',
          ar: 'من باقات العمرة والجولات التاريخية والتراثية إلى رحلات الشركات والعطلات الترفيهية، ننفذ كافة التفاصيل.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Travel Planning', ar: 'تخطيط السفر' }, description: { en: 'Custom itinerary curation for leisure and business trips.', ar: 'إعداد برامج سفر مخصصة للرحلات الترفيهية والتجارية.' } },
      { order: 2, title: { en: 'Tourism Packages', ar: 'الباقات السياحية' }, description: { en: 'All-inclusive cultural, adventure, and relaxation tours.', ar: 'جولات شاملة سياحية وثقافية ومغامرات واستجمام.' } },
      { order: 3, title: { en: 'Accommodation Coordination', ar: 'تنسيق الإقامة' }, description: { en: 'Hotel bookings, luxury resort reservations, and serviced apartments.', ar: 'حجوزات الفنادق والمنتجعات الفاخرة والشقق المخدومة.' } },
      { order: 4, title: { en: 'Transportation Arrangements', ar: 'ترتيبات المواصلات' }, description: { en: 'Airport transfers, private chauffeur vehicles, and bus charters.', ar: 'تنقلات المطار ومركبات بالسائق الخاص واستئجار الحافلات.' } },
      { order: 5, title: { en: 'Business Travel Support', ar: 'دعم سفر الأعمال' }, description: { en: 'Corporate travel management, flight bookings, and MICE coordination.', ar: 'إدارة سفر الشركات وحجوزات الطيران وتنسيق المؤتمرات.' } },
      { order: 6, title: { en: 'Group Travel', ar: 'سفر المجموعات' }, description: { en: 'Delegation travel management and family vacation coordination.', ar: 'إدارة سفر الوفود وتنسيق عطلات العائلات.' } },
      { order: 7, title: { en: 'Destination Experiences', ar: 'تجارب الوجهات' }, description: { en: 'Guided tours, desert safaris, and historical site access.', ar: 'جولات مع مرشدين ورحلات سفاري صحراوية وزيارة المواقع التاريخية.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Leisure Travel', ar: 'السفر الترفيهي' }, description: { en: 'Personal holidays, honeymoons, and solo adventures.', ar: 'العطلات الشخصية ورحلات شهر العسل والمغامرات.' } },
      { order: 2, title: { en: 'Family Travel', ar: 'السفر العائلي' }, description: { en: 'Family-friendly vacations with curated kid activities.', ar: 'عطلات عائلية مريحة مع أنشطة للأطفال.' } },
      { order: 3, title: { en: 'Business Travel', ar: 'سفر الأعمال' }, description: { en: 'Executive travel, trade show delegations, and client visits.', ar: 'سفر التنفيذيين ووفود المعارض التجارية وزيارات العملاء.' } },
      { order: 4, title: { en: 'Group Tours', ar: 'جولات المجموعات' }, description: { en: 'Institutional group travel and educational tours.', ar: 'سفر المجموعات المؤسسية والجولات التعليمية.' } },
      { order: 5, title: { en: 'Destination Tourism', ar: 'سياحة الوجهات' }, description: { en: 'Exploring Saudi UNESCO heritage sites like AlUla & Diriyah.', ar: 'استكشاف مواقع اليونسكو في السعودية مثل العلا والدرعية.' } },
      { order: 6, title: { en: 'Cultural Experiences', ar: 'التجارب الثقافية' }, description: { en: 'Authentic local gastronomy and traditional festival tours.', ar: 'تجارب الطهي المحلي والمهرجانات التقليدية.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Convenient Planning', ar: 'تخطيط مريح' }, description: { en: 'Single point of contact for flights, hotels, and tours.', ar: 'جهة تواصل واحدة للطيران والفنادق والجولات.' } },
      { order: 2, title: { en: 'Coordinated Services', ar: 'خدمات منسقة' }, description: { en: 'Seamless transitions between transfers, check-ins, and tours.', ar: 'تنقلات سلسة بين الاستقبال في المطار والإقامة والجولات.' } },
      { order: 3, title: { en: 'Flexible Options', ar: 'خيارات مرنة' }, description: { en: 'Customizable trip packages matching budget and schedule.', ar: 'باقات سفر قابلة للتعديل تناسب الميزانية والجدول.' } },
      { order: 4, title: { en: 'Personalized Experiences', ar: 'تجارب مخصصة' }, description: { en: 'Tailored travel recommendations based on traveler preferences.', ar: 'توصيات سفر مخصصة حسب تفضيلات المسافر.' } },
      { order: 5, title: { en: 'Reliable Support', ar: 'دعم موثوق' }, description: { en: '24/7 on-trip assistance hotline during your travels.', ar: 'خط دعم على مدار الساعة طوال فترة الرحلة.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Travel Requirement Assessment', ar: 'تقييم متطلبات السفر' }, description: { en: 'Consulting on dates, destinations, and party size.', ar: 'الاستشارة بشأن التواريخ والوجهات وعدد المسافرين.' } },
      { order: 2, stepNumber: 2, title: { en: 'Destination Planning', ar: 'تخطيط الوجهة' }, description: { en: 'Designing day-by-day travel itinerary choices.', ar: 'تصميم خيارات برنامج السفر يوماً بيوم.' } },
      { order: 3, stepNumber: 3, title: { en: 'Travel Arrangement', ar: 'ترتيبات السفر' }, description: { en: 'Booking flights, train passes, and entry tickets.', ar: 'حجز رحلات الطيران وتذاكر القطارات ورسوم الدخول.' } },
      { order: 4, stepNumber: 4, title: { en: 'Accommodation Coordination', ar: 'تنسيق الإقامة' }, description: { en: 'Securing hotel room confirmations and special requests.', ar: 'تأكيد حجوزات الغرف الفندقية والطلبات الخاصة.' } },
      { order: 5, stepNumber: 5, title: { en: 'Transportation Coordination', ar: 'تنسيق المواصلات' }, description: { en: 'Assigning private drivers and airport meet-and-assist.', ar: 'تخصيص سائقين خاصين وخدمة الاستقبال والمساعدة بالمطار.' } },
      { order: 6, stepNumber: 6, title: { en: 'Travel Support', ar: 'دعم السفر' }, description: { en: 'Providing travel vouchers, mobile updates, and live concierge support.', ar: 'توفير قسائم السفر والتحديثات والتواصل المباشر.' } }
    ],
    cta: {
      title: { en: 'Your Journey Starts Here', ar: 'رحلتك تبدأ من هنا' },
      description: {
        en: 'Travel solutions designed to make every journey more convenient and memorable.',
        ar: 'حلول سفر مصممة لجعل كل رحلة أكثر راحة وتميزاً.'
      },
      buttonText: { en: 'Plan Your Journey', ar: 'خطط لرحلتك' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Hotels', ar: 'الفنادق' },
    slug: 'hotels',
    category: 'hospitality',
    shortDescription: {
      en: 'Comfortable Stays. Thoughtful Hospitality.',
      ar: 'إقامات مريحة. ضيافة راقية.'
    },
    icon: '🏨',
    featured: false,
    displayOrder: 7,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'REAL ESTATE & HOSPITALITY', ar: 'العقارات والضيافة' },
      title: { en: 'Hotel & Hospitality Services', ar: 'خدمات الفنادق والضيافة' },
      subtitle: { en: 'Comfortable Stays. Thoughtful Hospitality.', ar: 'إقامات مريحة. ضيافة راقية.' },
      description: {
        en: "Dazz's hospitality activities include hotel and accommodation solutions designed around comfort, convenience and quality guest experiences. Our hospitality approach aims to provide welcoming environments for both leisure and business travelers.",
        ar: 'تتضمن أنشطة الضيافة لدى داز حلول الفنادق والإقامة المصممة حول الراحة والملاءمة وتجارب الضيوف عالية الجودة.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Book Accommodations', ar: 'حجز إقامة' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'HOTEL MANAGEMENT & STAYS', ar: 'إدارة الفنادق والإقامات' },
      title: { en: 'Thoughtful Hospitality & Guest Comfort', ar: 'ضيافة راقية وراحة كاملة للضيوف' },
      mainDescription: {
        en: "Dazz's hospitality activities include hotel and accommodation solutions designed around comfort, convenience and quality guest experiences.",
        ar: 'تتضمن أنشطة الضيافة لدى داز حلول الفنادق والإقامة المصممة حول الراحة والملاءمة وتجارب الضيوف عالية الجودة.'
      },
      paragraphs: [
        {
          en: 'Our hotel property operations combine elegant room design, attentive concierge services, and central urban locations.',
          ar: 'تجمع عمليات تشغيل الفنادق لدينا بين التصميم الأنيق للغرف وخدمات الاستقبال المتميزة والمواقع المركزية.'
        },
        {
          en: 'We cater to international corporate guests, government delegations, and vacationing families seeking warm Arabian hospitality.',
          ar: 'نلبي احتياجات الضيوف التنفيذيين الدوليين والوفود الحكومية والعائلات التي تبحث عن الضيافة العربية الأصيلة.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Guest Accommodation', ar: 'إقامة الضيوف' }, description: { en: 'Premium guest rooms, executive suites, and family units.', ar: 'غرف ضيوف متميزة، أجنحة تنفيذية، ووحدات عائلية.' } },
      { order: 2, title: { en: 'Business Stays', ar: 'إقامات الأعمال' }, description: { en: 'High-speed Wi-Fi, executive lounges, and in-room workspaces.', ar: 'إنترنت عالي السرعة، صالات تنفيذية، ومساحات عمل بالغرف.' } },
      { order: 3, title: { en: 'Leisure Stays', ar: 'الإقامات الترفيهية' }, description: { en: 'Resort amenities, swimming pools, fitness centers, and spas.', ar: 'مرافق منتجعات، حمامات سباحة، مراكز لياقة، وسبا.' } },
      { order: 4, title: { en: 'Hotel Services', ar: 'الخدمات الفندقية' }, description: { en: '24/7 room service, daily housekeeping, and laundry services.', ar: 'خدمة الغرف على مدار الساعة، تنظيف يومي، وخدمات الغسيل.' } },
      { order: 5, title: { en: 'Guest Support', ar: 'دعم الضيوف' }, description: { en: 'Multilingual concierge desk, luggage handling, and local guidance.', ar: 'مكتب استقبال متعدد اللغات، التعامل مع الأمتعة، وإرشاد محلي.' } },
      { order: 6, title: { en: 'Hospitality Management', ar: 'إدارة الضيافة' }, description: { en: 'Hotel asset operations, revenue management, and quality control.', ar: 'تشغيل الأصول الفندقية، إدارة الإيرادات، ومراقبة الجودة.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Business Travelers', ar: 'مسافرو الأعمال' }, description: { en: 'Corporate executives requiring efficient business amenities.', ar: 'المدراء التنفيذيون المتطلبون لمرافق أعمال كفؤة.' } },
      { order: 2, title: { en: 'Families', ar: 'العائلات' }, description: { en: 'Spacious interconnecting suites for family holidays.', ar: 'أجنحة متصلة واسعة للعطلات العائلية.' } },
      { order: 3, title: { en: 'Leisure Travelers', ar: 'السياح والزوار' }, description: { en: 'Tourists exploring city culture and heritage attractions.', ar: 'السياح الذين يستكشفون ثقافة المدينة والمعالم التراثية.' } },
      { order: 4, title: { en: 'Groups & Delegations', ar: 'المجموعات والوفود' }, description: { en: 'Conference attendees and trade delegation blocks.', ar: 'حضور المؤتمرات وحجوزات الوفود التجارية.' } },
      { order: 5, title: { en: 'Long-Stay Guests', ar: 'الإقامات الطويلة' }, description: { en: 'Serviced long-term residential hotel apartments.', ar: 'شقق فندقية مخدومة للإقامات طويلة الأجل.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Comfortable Accommodation', ar: 'إقامة مريحة' }, description: { en: 'Ergonomic bedding, soundproof rooms, and modern climate control.', ar: 'أسرة مريحة، غرف عازلة للصوت، وتكييف حديث.' } },
      { order: 2, title: { en: 'Convenient Locations', ar: 'مواقع متميزة' }, description: { en: 'Prime positioning near business districts and airports.', ar: 'مواقع قريبة من قطاعات الأعمال والمطارات.' } },
      { order: 3, title: { en: 'Professional Service', ar: 'خدمة احترافية' }, description: { en: 'Trained hospitality staff committed to guest satisfaction.', ar: 'طاقم ضيافة مدرب ملتزم برضا الضيوف.' } },
      { order: 4, title: { en: 'Guest Support', ar: 'دعم الضيوف' }, description: { en: 'Prompt response to all guest inquiries and service requests.', ar: 'استجابة سريعة لجميع استفسارات وطلبات الضيوف.' } },
      { order: 5, title: { en: 'Business-Friendly Stays', ar: 'إقامات مناسبة للأعمال' }, description: { en: 'Equipped meeting rooms and high-speed connectivity.', ar: 'قاعات اجتماعات مجهزة واتصال عالي السرعة.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Guest Reservation', ar: 'حجز الضيف' }, description: { en: 'Online booking or direct phone reservation confirmation.', ar: 'تأكيد الحجز عبر الإنترنت أو الهاتف مباشرة.' } },
      { order: 2, stepNumber: 2, title: { en: 'Check-In', ar: 'تسجيل الوصول' }, description: { en: 'Express check-in with welcome beverage.', ar: 'تسجيل وصول سريع مع مشروب الترحيب.' } },
      { order: 3, stepNumber: 3, title: { en: 'Guest Services', ar: 'خدمات الضيف' }, description: { en: 'Room orientation and luggage placement.', ar: 'التعريف بالغرفة وتوصيل الأمتعة.' } },
      { order: 4, stepNumber: 4, title: { en: 'Stay Experience', ar: 'تجربة الإقامة' }, description: { en: 'Enjoying dining, wellness facilities, and housekeeping.', ar: 'الاستمتاع بالمطاعم ومرافق اللياقة والتنظيف.' } },
      { order: 5, stepNumber: 5, title: { en: 'Guest Support', ar: 'دعم الضيف' }, description: { en: 'Concierge booking support for local dining and tours.', ar: 'دعم حجز الاستقبال للمطاعم المحلية والجولات.' } },
      { order: 6, stepNumber: 6, title: { en: 'Check-Out', ar: 'تسجيل المغادرة' }, description: { en: 'Smooth folio settlement and departure transfer arrangements.', ar: 'تسوية الفاتورة والتنظيم لمغادرة مريحة.' } }
    ],
    cta: {
      title: { en: 'A Better Stay Begins Here', ar: 'إقامة أفضل تبدأ من هنا' },
      description: {
        en: 'Hospitality experiences designed around comfort, convenience and exceptional guest care.',
        ar: 'تجارب ضيافة مصممة حول الراحة والملاءمة والعناية الاستثنائية بالضيوف.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Restaurants and Catering', ar: 'المطاعم والتموين' },
    slug: 'restaurants-and-catering',
    category: 'hospitality',
    shortDescription: {
      en: 'Great Food. Memorable Experiences.',
      ar: 'طعام رائع. تجارب لا تُنسى.'
    },
    icon: '🍽️',
    featured: false,
    displayOrder: 8,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'REAL ESTATE & HOSPITALITY', ar: 'العقارات والضيافة' },
      title: { en: 'Restaurants and Catering', ar: 'المطاعم والتموين' },
      subtitle: { en: 'Great Food. Memorable Experiences.', ar: 'طعام رائع. تجارب لا تُنسى.' },
      description: {
        en: "Dazz's restaurants and catering activities focus on delivering quality food and dependable hospitality experiences for individuals, families, businesses and events.",
        ar: 'تركز أنشطة المطاعم والتموين في داز على تقديم طعام عالي الجودة وتجارب ضيافة موثوقة للأفراد والعائلات والشركات والفعاليات.'
      },
      ctaPrimary: { text: { en: 'Plan Your Event', ar: 'خطط لفعاليتك' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Explore Menus', ar: 'استكشاف القوائم' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'CULINARY & CATERING SERVICES', ar: 'خدمات الطهي والتموين' },
      title: { en: 'Exceptional Culinary Dining & Catering', ar: 'تناول طعام استثنائي وخدمات تموين' },
      mainDescription: {
        en: "Dazz's restaurants and catering activities focus on delivering quality food and dependable hospitality experiences.",
        ar: 'تركز أنشطة المطاعم والتموين في داز على تقديم طعام عالي الجودة وتجارب ضيافة موثوقة.'
      },
      paragraphs: [
        {
          en: 'Our culinary team operates signature dining outlets and large-scale central production kitchens certified to ISO food safety standards.',
          ar: 'يدير فريق الطهي لدينا مطاعم متميزة ومطابخ إنتاج مركزية معتمدة وفقاً لمعايير سلامة الأغذية ISO.'
        },
        {
          en: 'We provide corporate workforce catering, executive banquet services, and private event dining across major regional hubs.',
          ar: 'نقدم تموين الكوادر العمالية للشركات، وخدمات الولائم التنفيذية، وتناول الطعام للمناسبات الخاصة عبر المراكز الإقليمية الرئيسية.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Restaurant Services', ar: 'خدمات المطاعم' }, description: { en: 'Fine dining and casual restaurant concepts.', ar: 'مفاهيم المطاعم الفاخرة والمطاعم العصرية.' } },
      { order: 2, title: { en: 'Event Catering', ar: 'تموين الفعاليات' }, description: { en: 'Buffet and plated menu catering for weddings and galas.', ar: 'تموين بوفيه وقوائم طعام للأعراس والاحتفالات.' } },
      { order: 3, title: { en: 'Corporate Catering', ar: 'تموين الشركات' }, description: { en: 'Daily executive lunches, meeting coffee breaks, and staff meal plans.', ar: 'وجبات غداء يومية للتنفيذيين، استراحات قهوة، ووجبات الموظفين.' } },
      { order: 4, title: { en: 'Private Events', ar: 'المناسبات الخاصة' }, description: { en: 'Personalized private chef dining and home catering.', ar: 'طهاة خاصون وتجهيز المناسبات العائلية والمنازل.' } },
      { order: 5, title: { en: 'Group Dining', ar: 'تناول الطعام للمجموعات' }, description: { en: 'Large capacity dining reservations for tour groups.', ar: 'حجوزات طعام واسعة لمجموعات الرحلات السياحية.' } },
      { order: 6, title: { en: 'Food & Beverage Services', ar: 'خدمات الأغذية والمشروبات' }, description: { en: 'Menu R&D, nutritional planning, and HACCP food safety management.', ar: 'تطوير القوائم والتخطيط الغذائي وإدارة سلامة الأغذية (HACCP).' } }
    ],
    applications: [
      { order: 1, title: { en: 'Corporate Events', ar: 'فعاليات الشركات' }, description: { en: 'Annual corporate celebrations and product launches.', ar: 'الاحتفالات السنوية للشركات وإطلاق المنتجات.' } },
      { order: 2, title: { en: 'Conferences', ar: 'المؤتمرات' }, description: { en: 'High-capacity delegate catering and VIP break stations.', ar: 'تموين كبار الشخصيات وحضور المؤتمرات.' } },
      { order: 3, title: { en: 'Private Gatherings', ar: 'اللقاءات الخاصة' }, description: { en: 'Family anniversaries and VIP private dinner banquets.', ar: 'المناسبات العائلية والمآدب الخاصة بكبار الشخصيات.' } },
      { order: 4, title: { en: 'Celebrations', ar: 'الاحتفالات' }, description: { en: 'National Day events, weddings, and community festivals.', ar: 'احتفالات اليوم الوطني والأعراس والمهرجانات.' } },
      { order: 5, title: { en: 'Hospitality Events', ar: 'فعاليات الضيافة' }, description: { en: 'Hotel popup dining and collaborative chef takeovers.', ar: 'فعاليات المطاعم المؤقتة بالفنادق واستضافات الطهاة.' } },
      { order: 6, title: { en: 'Group Functions', ar: 'المناسبات الجماعية' }, description: { en: 'Institutional dining and project site catering.', ar: 'تموين المؤسسات ومواقع المشاريع.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Quality Food', ar: 'طعام عالي الجودة' }, description: { en: 'Fresh ingredients sourced from certified agricultural suppliers.', ar: 'مكونات طازجة من موردين زراعيين معتمدين.' } },
      { order: 2, title: { en: 'Professional Service', ar: 'خدمة احترافية' }, description: { en: 'Experienced waitstaff, banquet managers, and master chefs.', ar: 'طاقم خدمة ومدراء ولائم وطهاة محترفون.' } },
      { order: 3, title: { en: 'Flexible Menus', ar: 'قوائم مرنة' }, description: { en: 'Customizable International, Arabic, and Asian culinary menus.', ar: 'قوائم طعام عالمية وعربية وآسيوية قابلة للتعديل.' } },
      { order: 4, title: { en: 'Event-Focused Solutions', ar: 'حلول تركز على الفعالية' }, description: { en: 'Mobile live-cooking stations and insulated food transport.', ar: 'محطات طهي مباشرة ونقل طعام مبرّد ومحافظ على الحرارة.' } },
      { order: 5, title: { en: 'Reliable Coordination', ar: 'تنسيق موثوق' }, description: { en: 'Punctual setup, service execution, and post-event cleanup.', ar: 'تجهيز وتنفيذ ودقيق ونظافة بعد الفعالية.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Event Requirement Assessment', ar: 'تقييم متطلبات الفعالية' }, description: { en: 'Reviewing guest count, dietary rules, and service style.', ar: 'مراجعة عدد الضيوف والاشتراطات الغذائية ونمط الخدمة.' } },
      { order: 2, stepNumber: 2, title: { en: 'Menu Planning', ar: 'تخطيط القائمة' }, description: { en: 'Designing customized menu tasting options.', ar: 'تصميم عينات تذوق القائمة المخصصة.' } },
      { order: 3, stepNumber: 3, title: { en: 'Food Preparation', ar: 'تجهيز الطعام' }, description: { en: 'HACCP-compliant preparation in central kitchens.', ar: 'التجهيز المعتمد في المطابخ المركزية.' } },
      { order: 4, stepNumber: 4, title: { en: 'Service Coordination', ar: 'تنسيق الخدمة' }, description: { en: 'Setting up banquet tables, chafing dishes, and beverage bars.', ar: 'تجهيز طاولات الولائم وسخانات الطعام ومحطات المشروبات.' } },
      { order: 5, stepNumber: 5, title: { en: 'Event Catering', ar: 'تموين الفعالية' }, description: { en: 'Executing seamless live food and beverage service.', ar: 'تقديم خدمة طعام ومشروبات مباشرة وسلسة.' } },
      { order: 6, stepNumber: 6, title: { en: 'Post-Event Support', ar: 'دعم ما بعد الفعالية' }, description: { en: 'Clearing equipment and managing responsible food disposal.', ar: 'إزالة المعدات والتعامل المسيل مع بقايا الطعام.' } }
    ],
    cta: {
      title: { en: 'Made for Every Occasion', ar: 'مصمم لكل مناسبة' },
      description: {
        en: 'Food and catering solutions designed to bring people together and make every occasion memorable.',
        ar: 'حلول الأغذية والتموين المصممة لجمع الناس وجعل كل مناسبة لا تُنسى.'
      },
      buttonText: { en: 'Plan Your Event', ar: 'خطط لفعاليتك' },
      buttonUrl: '/contact'
    }
  },

  // ─── CATEGORY 3: Trading & Distribution (category: 'food-trading') ─────────
  {
    name: { en: 'Food Import, Export & Trading', ar: 'استيراد وتصدير وتجارة الأغذية' },
    slug: 'food-import-export-and-trading',
    category: 'food-trading',
    shortDescription: {
      en: 'Connecting Markets. Delivering Quality.',
      ar: 'الربط بين الأسواق. تقديم الجودة.'
    },
    icon: '🌾',
    featured: true,
    displayOrder: 9,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'TRADING & DISTRIBUTION', ar: 'التجارة والتوزيع' },
      title: { en: 'Food Import, Export & Trading', ar: 'استيراد وتصدير وتجارة الأغذية' },
      subtitle: { en: 'Connecting Markets. Delivering Quality.', ar: 'الربط بين الأسواق. تقديم الجودة.' },
      description: {
        en: 'Dazz provides food import, export and trading solutions connecting suppliers and markets through reliable sourcing and distribution networks. Our focus is on efficient trade, dependable supply and quality-oriented product sourcing.',
        ar: 'تقدم داز حلول استيراد وتصدير وتجارة الأغذية لربط الموردين والأسواق عبر شبكات توريد وتوزيع موثوقة. نركز على التجارة الكفء والتوريد الموثوق.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Explore Products', ar: 'استكشاف المنتجات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'GLOBAL FOOD TRADE', ar: 'التجارة الغذائية العالمية' },
      title: { en: 'Global Food Supply & Distribution Networks', ar: 'شبكات التوريد والتوزيع الغذائي العالمية' },
      mainDescription: {
        en: 'Dazz provides food import, export and trading solutions connecting suppliers and markets through reliable sourcing and distribution networks.',
        ar: 'تقدم داز حلول استيراد وتصدير وتجارة الأغذية لربط الموردين والأسواق عبر شبكات توريد وتوزيع موثوقة.'
      },
      paragraphs: [
        {
          en: 'Our food trading division operates cold-chain logistics and SFDA-compliant customs clearance for bulk food commodities.',
          ar: 'يدير قسم التجارة الغذائية لدينا لوجستيات السلسلة الباردة والتخليص الجمركي المعتمد من هيئة الغذاء والدواء للمنتجات الغذائية.'
        },
        {
          en: 'We bridge producers across South America, Europe, and Asia with wholesale food distributors and supermarket chains in KSA.',
          ar: 'نربط المنتجين في أمريكا الجنوبية وأوروبا وآسيا بموزعي الأغذية بسعر الجملة وسلاسل السوبرماركت في السعودية.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Food Import', ar: 'استيراد الأغذية' }, description: { en: 'Importing grain, pulses, spices, and processed food products.', ar: 'استيراد الحبوب والبقوليات والبهارات والأغذية المصنعة.' } },
      { order: 2, title: { en: 'Food Export', ar: 'تصدير الأغذية' }, description: { en: 'Exporting premium Saudi dates, produce, and local food brands.', ar: 'تصدير التمور السعودية الفاخرة والمحاصيل والعلامات التجارية.' } },
      { order: 3, title: { en: 'Food Trading', ar: 'تجارة الأغذية' }, description: { en: 'Bulk commodity trading and spot market supply.', ar: 'تجارة السلع السائبة والتوريد في السوق الفوري.' } },
      { order: 4, title: { en: 'Product Sourcing', ar: 'توفير المنتجات' }, description: { en: 'Identifying certified international food producers and farms.', ar: 'تحديد منتجي ومزارع الأغذية الدوليين المعتمدين.' } },
      { order: 5, title: { en: 'Supplier Coordination', ar: 'تنسيق الموردين' }, description: { en: 'Managing international supplier contracts and quality audits.', ar: 'إدارة عقود الموردين الدوليين وتدقيق الجودة.' } },
      { order: 6, title: { en: 'Distribution', ar: 'التوزيع' }, description: { en: 'Temperature-controlled logistics delivery to regional warehouses.', ar: 'توصيل لوجستي خاضع للحرارة إلى المستودعات الإقليمية.' } },
      { order: 7, title: { en: 'Market Supply', ar: 'تزويد السوق' }, description: { en: 'Consistent inventory supply matching retail consumer demand.', ar: 'توريد مخزون مستمر متوافق مع طلب المستهلكين.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Food Distribution', ar: 'توزيع الأغذية' }, description: { en: 'Supplying regional wholesale food distribution centers.', ar: 'تزويد مراكز توزيع الأغذية الإقليمية بالجملة.' } },
      { order: 2, title: { en: 'Commercial Food Supply', ar: 'توريد الأغذية التجاري' }, description: { en: 'Commercial food processors and industrial bakeries.', ar: 'مصانع الأغذية التجارية والمخابز الصناعية.' } },
      { order: 3, title: { en: 'Retail Supply', ar: 'توريد التجزئة' }, description: { en: 'Hypermarkets, supermarket chains, and grocery networks.', ar: 'الهايبرماركت وسلاسل السوبرماركت والبقالات.' } },
      { order: 4, title: { en: 'Wholesale Markets', ar: 'أسواق الجملة' }, description: { en: 'Central produce and grain wholesale trading hubs.', ar: 'مراكز تجارة المحاصيل والحبوب بالجملة.' } },
      { order: 5, title: { en: 'Hospitality Supply', ar: 'توريد الضيافة' }, description: { en: 'HORECA food supply for hotels, restaurants, and catering.', ar: 'توريد قطاع الضيافة للفنادق والمطاعم والتموين.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Reliable Sourcing', ar: 'توفير موثوق' }, description: { en: 'Direct farm and producer origins ensuring full traceability.', ar: 'مصادر مباشرة من المزارع والمنتجين تضمن التتبع الكامل.' } },
      { order: 2, title: { en: 'Market Connectivity', ar: 'الربط بالأسواق' }, description: { en: 'Established import-export trade corridors globally.', ar: 'ممرات تجارية للاستيراد والتصدير معتمدة عالمياً.' } },
      { order: 3, title: { en: 'Supply Coordination', ar: 'تنسيق التوريد' }, description: { en: 'SFDA lab testing and clearance compliance.', ar: 'مطابقة الفحوصات المخبرية وتخليص هيئة الغذاء والدواء.' } },
      { order: 4, title: { en: 'Quality Focus', ar: 'تركيز على الجودة' }, description: { en: 'Cold chain integrity from port offloading to store delivery.', ar: 'سلامة السلسلة الباردة من التنزيل بالميناء حتى الرف.' } },
      { order: 5, title: { en: 'Distribution Support', ar: 'دعم التوزيع' }, description: { en: 'Refrigerated truck fleet ensuring shelf-life preservation.', ar: 'أسطول شاحنات مبردة يضمن الحفاظ على فترة الصلاحية.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Product Sourcing', ar: 'توفير المنتجات' }, description: { en: 'Evaluating food grade specifications and supplier ISO certifications.', ar: 'تقييم مواصفات جودة الأغذية وشهادات ISO للموردين.' } },
      { order: 2, stepNumber: 2, title: { en: 'Supplier Coordination', ar: 'تنسيق الموردين' }, description: { en: 'Issuing letters of credit and contract terms.', ar: 'إصدار خطابات الاعتماد المستندي وشروط العقود.' } },
      { order: 3, stepNumber: 3, title: { en: 'Quality Verification', ar: 'التحقق من الجودة' }, description: { en: 'Pre-shipment inspection and phytosanitary verification.', ar: 'الفحص قبل الشحن والتحقق من الشهادات الصحية النباتية.' } },
      { order: 4, stepNumber: 4, title: { en: 'Import & Export Coordination', ar: 'تنسيق الاستيراد والتصدير' }, description: { en: 'Port customs clearing via Fasah portal.', ar: 'التخليص الجمركي بالميناء عبر منصة فسح.' } },
      { order: 5, stepNumber: 5, title: { en: 'Distribution', ar: 'التوزيع' }, description: { en: 'Warehousing in temperature-controlled facilities.', ar: 'التخزين في مستودعات خاضعة للتحكم بالحرارة.' } },
      { order: 6, stepNumber: 6, title: { en: 'Market Delivery', ar: 'التسليم للسوق' }, description: { en: 'Final delivery to distributors and retail client warehouses.', ar: 'التسليم النهائي للموزعين ومستودعات العملاء.' } }
    ],
    cta: {
      title: { en: 'Connecting Food Markets', ar: 'ربط أسواق الأغذية' },
      description: {
        en: 'Reliable food trading and distribution solutions connecting suppliers, markets and customers.',
        ar: 'حلول تجارة وتوزيع الأغذية الموثوقة التي تربط الموردين والأسواق والعملاء.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Seafoods', ar: 'المأكولات البحرية' },
    slug: 'seafoods',
    category: 'food-trading',
    shortDescription: {
      en: 'Quality Seafood. Reliable Supply.',
      ar: 'مأكولات بحرية عالية الجودة. توريد موثوق.'
    },
    icon: '🐟',
    featured: false,
    displayOrder: 10,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'TRADING & DISTRIBUTION', ar: 'التجارة والتوزيع' },
      title: { en: 'Seafood Trading & Supply', ar: 'تجارة وتوريد المأكولات البحرية' },
      subtitle: { en: 'Quality Seafood. Reliable Supply.', ar: 'مأكولات بحرية عالية الجودة. توريد موثوق.' },
      description: {
        en: "Dazz's seafood trading activities focus on sourcing and distributing seafood products through dependable supply networks. Our approach emphasizes product quality, responsible handling and reliable market supply.",
        ar: 'تركز أنشطة تجارة المأكولات البحرية في داز على توريد وتوزيع المنتجات البحرية عبر شبكات إمداد موثوقة. نؤكد على الجودة والتعامل المسؤول.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Seafood Catalog', ar: 'كتالوج المأكولات البحرية' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'COLD-CHAIN SEAFOOD TRADE', ar: 'تجارة المأكولات البحرية بالمبرد' },
      title: { en: 'Fresh & Frozen Seafood Supply Chain', ar: 'سلسلة إمداد المأكولات البحرية الطازجة والمجمدة' },
      mainDescription: {
        en: "Dazz's seafood trading activities focus on sourcing and distributing seafood products through dependable supply networks.",
        ar: 'تركز أنشطة تجارة المأكولات البحرية في داز على توريد وتوزيع المنتجات البحرية عبر شبكات إمداد موثوقة.'
      },
      paragraphs: [
        {
          en: 'We source sustainable fresh catch and IQF (Individually Quick Frozen) seafood products from oceanic fisheries and certified aquaculture farms.',
          ar: 'نوفر صيداً طازجاً مستداماً ومنتجات بحرية مجمدة سريعاً من مصايد ومزارع استزراع مائي معتمدة.'
        },
        {
          en: 'Our ultra-low temperature logistics guarantee peak freshness for hotels, restaurants, and retail seafood markets.',
          ar: 'تضمن لوجستياتنا ذات الحرارة المنخفضة جدا طزاجة فائقة للفنادق والمطاعم وأسواق التجزئة.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Seafood Sourcing', ar: 'توفير المأكولات البحرية' }, description: { en: 'Direct sourcing of wild-caught fish and farmed shrimp.', ar: 'توفير مباشر للأسماك البرية والربيان المستزرع.' } },
      { order: 2, title: { en: 'Seafood Trading', ar: 'تجارة المأكولات البحرية' }, description: { en: 'Wholesale commodity seafood trading for regional markets.', ar: 'تجارة المأكولات البحرية بالجملة للأسواق الإقليمية.' } },
      { order: 3, title: { en: 'Seafood Import', ar: 'استيراد المأكولات البحرية' }, description: { en: 'Air freight fresh seafood import and reefer container shipments.', ar: 'استيراد الأغذية البحرية الطازجة شحناً جوياً وحاويات مبردة.' } },
      { order: 4, title: { en: 'Seafood Export', ar: 'تصدير المأكولات البحرية' }, description: { en: 'Exporting Red Sea fish species to international distributors.', ar: 'تصدير أسماك البحر الأحمر للموزعين الدوليين.' } },
      { order: 5, title: { en: 'Seafood Distribution', ar: 'توزيع المأكولات البحرية' }, description: { en: 'Sub-zero cold chain distribution fleet delivering to client kitchens.', ar: 'أسطول توزيع تحت الصفر يوصل لمطابخ العملاء.' } },
      { order: 6, title: { en: 'Supplier Coordination', ar: 'تنسيق الموردين' }, description: { en: 'Managing fishery compliance and HACCP safety certificates.', ar: 'إدارة مطابقة المصايد وشهادات السلامة (HACCP).' } },
      { order: 7, title: { en: 'Market Supply', ar: 'تزويد السوق' }, description: { en: 'Daily scheduled deliveries to retail hypermarkets.', ar: 'توصيل مجدول يوميا للهايبرماركت.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Wholesale Distribution', ar: 'التوزيع بالجملة' }, description: { en: 'Fish market wholesalers and central cold storage hubs.', ar: 'تجار أسواق الأسماك ومراكز التخزين البارد.' } },
      { order: 2, title: { en: 'Retail Supply', ar: 'توريد التجزئة' }, description: { en: 'Seafood counters in major supermarket chains.', ar: 'أقسام الأسماك بسلاسل السوبرماركت الكبرى.' } },
      { order: 3, title: { en: 'Restaurant Supply', ar: 'توريد المطاعم' }, description: { en: 'Seafood restaurants and sushi dining outlets.', ar: 'مطاعم المأكولات البحرية ومطاعم السوشي.' } },
      { order: 4, title: { en: 'Hospitality Supply', ar: 'توريد الضيافة' }, description: { en: 'Luxury hotel dining banquet kitchens.', ar: 'مطابخ ولائم الفنادق الفاخرة.' } },
      { order: 5, title: { en: 'Food Trading', ar: 'تجارة الأغذية' }, description: { en: 'Institutional food brokers and caterers.', ar: 'وساطة الأغذية للمؤسسات والشركات.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Reliable Sourcing', ar: 'توفير موثوق' }, description: { en: 'Consistent supply of premium fish grades year-round.', ar: 'توريد مستمر لأجود درجات الأسماك على مدار العام.' } },
      { order: 2, title: { en: 'Quality Focus', ar: 'تركيز على الجودة' }, description: { en: 'Strict temperature monitoring from vessel offloading to client.', ar: 'مراقبة صارمة للحرارة من قارب الصيد حتى العميل.' } },
      { order: 3, title: { en: 'Efficient Distribution', ar: 'توزيع كفء' }, description: { en: 'Rapid air-freight and refrigerated road delivery.', ar: 'شحن جوي سريع ونقل بري مبرد.' } },
      { order: 4, title: { en: 'Supply Coordination', ar: 'تنسيق التوريد' }, description: { en: 'HACCP & SFDA regulatory compliance.', ar: 'التزام كامل بالمعايير الصحية وهيئة الغذاء والدواء.' } },
      { order: 5, title: { en: 'Market Connectivity', ar: 'الربط بالأسواق' }, description: { en: 'Direct access to global seafood catch origins.', ar: 'وصول مباشر لمصايد الأسماك العالمية.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Supplier Sourcing', ar: 'توفير الموردين' }, description: { en: 'Selecting certified sustainable fisheries and farms.', ar: 'اختيار المصايد والمزارع المستدامة المعتمدة.' } },
      { order: 2, stepNumber: 2, title: { en: 'Product Selection', ar: 'اختيار المنتجات' }, description: { en: 'Grading fish size, fillet quality, and freezing technique.', ar: 'تصنيف حجم الأسماك وجودة الفيليه وتقنية التجميد.' } },
      { order: 3, stepNumber: 3, title: { en: 'Quality Checking', ar: 'فحص الجودة' }, description: { en: 'Sensory inspection and lab bacterial testing.', ar: 'الفحص الحسي واختبار البكتيريا المعملي.' } },
      { order: 4, stepNumber: 4, title: { en: 'Logistics Coordination', ar: 'تنسيق اللوجستيات' }, description: { en: 'Reefer container shipping and cold chain customs clearance.', ar: 'الشحن بحاويات مبردة والتخليص بالسلسلة الباردة.' } },
      { order: 5, stepNumber: 5, title: { en: 'Distribution', ar: 'التوزيع' }, description: { en: 'Dispatching refrigerated trucks for client delivery.', ar: 'إرسال الشاحنات المبردة للتسليم للعميل.' } }
    ],
    cta: {
      title: { en: 'From Source to Market', ar: 'من المصدر إلى السوق' },
      description: {
        en: 'Connecting quality seafood suppliers with markets through reliable trading and distribution.',
        ar: 'ربط موردي المأكولات البحرية بالأسواق عبر التجارة والتوزيع الموثوق.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Mobile Accessories', ar: 'إكسسوارات الهواتف المحمولة' },
    slug: 'mobile-accessories',
    category: 'food-trading',
    shortDescription: {
      en: 'Connected Living. Smarter Accessories.',
      ar: 'حياة متصلة. إكسسوارات أذكى.'
    },
    icon: '📱',
    featured: false,
    displayOrder: 11,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'equipment', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'equipment', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'TRADING & DISTRIBUTION', ar: 'التجارة والتوزيع' },
      title: { en: 'Mobile Accessories Trading', ar: 'تجارة إكسسوارات الهواتف' },
      subtitle: { en: 'Connected Living. Smarter Accessories.', ar: 'حياة متصلة. إكسسوارات أذكى.' },
      description: {
        en: "Dazz's trading activities extend to mobile accessories and related consumer technology products. We focus on sourcing and distributing practical products that support today's connected lifestyles.",
        ar: 'تمتد أنشطة داز التجارية إلى إكسسوارات الهواتف ومنتجات التكنولوجيا الاستهلاكية. نركز على توفير وتوزيع المنتجات العملية التي تدعم نمط الحياة المتصل اليوم.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Product Catalog', ar: 'كتالوج المنتجات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'CONSUMER ELECTRONICS & TRADING', ar: 'الإلكترونيات الاستهلاكية والتجارة' },
      title: { en: 'Quality Mobile Accessories Sourcing & Supply', ar: 'توفير وتوريد إكسسوارات الهواتف المتميزة' },
      mainDescription: {
        en: "Dazz's trading activities extend to mobile accessories and related consumer technology products.",
        ar: 'تمتد أنشطة داز التجارية إلى إكسسوارات الهواتف ومنتجات التكنولوجيا الاستهلاكية.'
      },
      paragraphs: [
        {
          en: 'We source CE and SASO-compliant consumer tech accessories, charging solutions, and protective mobile gear from top original equipment manufacturers.',
          ar: 'نوفر إكسسوارات ومعدات شحن وأغطية حماية متوافقة مع معايير SASO و CE من مصنعي المعدات الأصليين.'
        },
        {
          en: 'Our wholesale distribution network supplies mobile retail stores, online e-commerce platforms, and commercial electronics vendors across the Kingdom.',
          ar: 'تزود شبكة التوزيع بالجملة لدينا متاجر الهواتف ومنصات التجارة الإلكترونية ومحلات الإلكترونيات التجارية بالمملكة.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Product Sourcing', ar: 'توفير المنتجات' }, description: { en: 'Sourcing high-grade electronics accessories from tier-1 manufacturers.', ar: 'توفير إكسسوارات إلكترونية متميزة من المصانع كبرى.' } },
      { order: 2, title: { en: 'Import & Export', ar: 'الاستيراد والتصدير' }, description: { en: 'Customs clearance and SASO CITC certification handling.', ar: 'التخليص الجمركي واستخراج شهادات مطابقة SASO وهيئة الاتصالات.' } },
      { order: 3, title: { en: 'Wholesale Distribution', ar: 'التوزيع بالجملة' }, description: { en: 'B2B bulk wholesale supply to electronic retail chains.', ar: 'التوريد بالجملة بين الشركات لسلاسل متاجر الإلكترونيات.' } },
      { order: 4, title: { en: 'Retail Supply', ar: 'توريد التجزئة' }, description: { en: 'Ready-for-shelf packaged mobile accessory merchandise.', ar: 'بضائع إكسسوارات مغلفة وجاهزة للعرض على الرفوف.' } },
      { order: 5, title: { en: 'Market Distribution', ar: 'توزيع السوق' }, description: { en: 'Nationwide logistics coverage ensuring inventory replenishment.', ar: 'تغطية لوجستية شاملة تضمن إعادة تجديد المخزون.' } }
    ],
    equipment: [
      { order: 1, name: { en: 'Mobile Phone Accessories', ar: 'إكسسوارات الهواتف المحمولة' }, description: { en: 'Stand-alone adapters, audio jacks, and OTG connectors.', ar: 'محولات وكابلات صوت ووصلات OTG.' }, specification: { en: 'Universal compatibility', ar: 'توافق عالمي مع مختلف الأجهزة' } },
      { order: 2, name: { en: 'Chargers & Wall Plugs', ar: 'الشواحن والقوابس' }, description: { en: 'Fast charging GaN wall chargers and multi-port docks.', ar: 'شواحن GaN سريعة ومنصات شحن متعددة المنافذ.' }, specification: { en: '20W to 100W PD fast charge', ar: 'شحن سريع PD من 20 واط إلى 100 واط' } },
      { order: 3, name: { en: 'Charging Cables', ar: 'كابلات الشحن' }, description: { en: 'Braided nylon USB-C, Lightning, and magnetic cables.', ar: 'كابلات USB-C ولايتنينج ونايلون مضفر ومغناطيسي.' }, specification: { en: 'Certified durability tested', ar: 'مفحوصة ومعتمدة لعمر طويل' } },
      { order: 4, name: { en: 'Power Banks', ar: 'بنوك الطاقة (المحافط)' }, description: { en: 'Slim magnetic wireless power banks and high-capacity chargers.', ar: 'بنوك طاقة لاسلكية مدمجة وشواحن ذات سعة عالية.' }, specification: { en: '10,000mAh to 30,000mAh', ar: 'من 10,000 إلى 30,000 ملي أمبير' } },
      { order: 5, name: { en: 'Earphones & Audio', ar: 'سماعات الأذن والصوتيات' }, description: { en: 'TWS wireless earbuds and noise-canceling headphones.', ar: 'سماعات TWS لاسلكية وسماعات إلغاء الضوضاء.' }, specification: { en: 'Bluetooth 5.3 chipsets', ar: 'شرائح بلوتوث 5.3 حديثة' } },
      { order: 6, name: { en: 'Phone Cases & Protectors', ar: 'الأغطية وحمايات الشاشة' }, description: { en: 'Shockproof TPU cases and 9H tempered glass screen protectors.', ar: 'أغطية TPU مضادة للصدمات وزجاج حماية الشاشة 9H.' }, specification: { en: 'Military-grade drop protection', ar: 'حماية من السقوط بالدرجة العسكرية' } },
      { order: 7, name: { en: 'Car Accessories', ar: 'إكسسوارات السيارات' }, description: { en: 'Magnetic MagSafe car mounts and FM transmitters.', ar: 'حوامل MagSafe للسيارات وأجهزة بث FM.' }, specification: { en: 'Qi certified wireless car charging', ar: 'شحن لاسلكي معتمد Qi للسيارات' } },
      { order: 8, name: { en: 'Connectivity Accessories', ar: 'إكسسوارات الاتصال' }, description: { en: 'Smartwatch bands, Bluetooth trackers, and card holders.', ar: 'أحزمة الساعات الذكية وأجهزة تتبع البلوتوث.' }, specification: { en: 'Premium silicone & leather options', ar: 'خيارات سيليكون وجلد فاخرة' } }
    ],
    applications: [
      { order: 1, title: { en: 'Retail Stores', ar: 'متاجر التجزئة' }, description: { en: 'Independent mobile shops and brand kiosks.', ar: 'محلات الهواتف المستقلة وأكشاك العلامات التجارية.' } },
      { order: 2, title: { en: 'Wholesale Merchants', ar: 'تجار الجملة' }, description: { en: 'Bulk accessories trading houses.', ar: 'مؤسسات تجارة الإكسسوارات بالجملة.' } },
      { order: 3, title: { en: 'Consumer Electronics', ar: 'الإلكترونيات الاستهلاكية' }, description: { en: 'Large format electronics superstores.', ar: 'متاجر الإلكترونيات الكبرى.' } },
      { order: 4, title: { en: 'Mobile Accessories Distribution', ar: 'توزيع إكسسوارات الهواتف' }, description: { en: 'Online store sellers and marketplace merchants.', ar: 'بائعو المتاجر الإلكترونية والتجار على المنصات.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Product Variety', ar: 'تنوع المنتجات' }, description: { en: 'Comprehensive portfolio of mobile connectivity products.', ar: 'محفظة شاملة لمنتجات اتصال الهواتف.' } },
      { order: 2, title: { en: 'Reliable Sourcing', ar: 'توفير موثوق' }, description: { en: 'Direct factory partnerships guaranteeing authentic products.', ar: 'شراكات مباشرة مع المصانع تضمن أصالة المنتجات.' } },
      { order: 3, title: { en: 'Distribution Support', ar: 'دعم التوزيع' }, description: { en: 'Fast inventory restocking and order processing.', ar: 'إعادة تجديد سريع للمخزون ومعالجة الطلبات.' } },
      { order: 4, title: { en: 'Market-Focused Supply', ar: 'توريد يركز على السوق' }, description: { en: 'Stocking accessories for the latest flagship phone models.', ar: 'توفير إكسسوارات لأحدث أجهزة الهواتف الذكية.' } },
      { order: 5, title: { en: 'Competitive Solutions', ar: 'حلول تنافسية' }, description: { en: 'Attractive wholesale pricing structures maximizing retail margin.', ar: 'أسعار جملة جاذبة تزيد هامش ربح التجزئة.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Product Sourcing', ar: 'توفير المنتجات' }, description: { en: 'Evaluating OEM factory samples and build durability.', ar: 'تقييم عينات مصانع OEM ومتانة الصنع.' } },
      { order: 2, stepNumber: 2, title: { en: 'Supplier Coordination', ar: 'تنسيق الموردين' }, description: { en: 'Negotiating volume orders and custom branding packaging.', ar: 'التفاوض على الكميات والتغليف ذو العلامة المخصصة.' } },
      { order: 3, stepNumber: 3, title: { en: 'Product Selection', ar: 'اختيار المنتجات' }, description: { en: 'Curating trending accessory models for seasonal demand.', ar: 'اختيار موديلات الإكسسوارات الأكثر طلبا حسب الموسم.' } },
      { order: 4, stepNumber: 4, title: { en: 'Import Coordination', ar: 'تنسيق الاستيراد' }, description: { en: 'Managing SASO certificate registration and customs clear.', ar: 'إدارة تسجيل شهادات SASO والتخليص الجمركي.' } },
      { order: 5, stepNumber: 5, title: { en: 'Distribution', ar: 'التوزيع' }, description: { en: 'Dispatching stock to regional retail distribution centers.', ar: 'إرسال المخزون لمراكز التوزيع السريعة.' } }
    ],
    cta: {
      title: { en: 'Powering a Connected Lifestyle', ar: 'دعم نمط الحياة المتصل' },
      description: {
        en: 'Practical mobile accessories sourced and distributed to meet everyday connectivity needs.',
        ar: 'إكسسوارات هواتف عملية يتم توفيرها وتوزيعها لتلبية احتياجات الاتصال اليومية.'
      },
      buttonText: { en: 'Contact Us', ar: 'تواصل معنا' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Commercial Services', ar: 'الخدمات التجارية' },
    slug: 'commercial-services',
    category: 'food-trading',
    shortDescription: {
      en: 'Business Solutions. Reliable Support.',
      ar: 'حلول الأعمال. دعم موثوق.'
    },
    icon: '💼',
    featured: false,
    displayOrder: 12,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'TRADING & DISTRIBUTION', ar: 'التجارة والتوزيع' },
      title: { en: 'Commercial Services & Trading Support', ar: 'الخدمات التجارية ودعم التجارة' },
      subtitle: { en: 'Business Solutions. Reliable Support.', ar: 'حلول الأعمال. دعم موثوق.' },
      description: {
        en: 'Dazz provides commercial services designed to support businesses with sourcing, trading, supply and operational requirements. Our flexible approach allows us to work across different business needs and market opportunities.',
        ar: 'تقدم داز خدمات تجارية مصممة لدعم الشركات في متطلبات التوريد والتجارة والإمداد والتشغيل. نهجنا المرن يسمح بالعمل عبر مختلف الاحتياجات.'
      },
      ctaPrimary: { text: { en: 'Talk to Us', ar: 'تحدث معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Commercial Solutions', ar: 'الحلول التجارية' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'COMMERCIAL BROKERAGE & PROCUREMENT', ar: 'الوساطة التجارية والتوريد' },
      title: { en: 'B2B Procurement & Commercial Supply Support', ar: 'دعم توريد الأعمال والتوريد التجاري B2B' },
      mainDescription: {
        en: 'Dazz provides commercial services designed to support businesses with sourcing, trading, supply and operational requirements.',
        ar: 'تقدم داز خدمات تجارية مصممة لدعم الشركات في متطلبات التوريد والتجارة والإمداد والتشغيل.'
      },
      paragraphs: [
        {
          en: 'Our commercial division provides corporate procurement agent services, supply chain consulting, and commercial representation for overseas companies entering KSA.',
          ar: 'يقدم قسمنا التجاري خدمات وكالة التوريد والإنفاق للشركات واستشارات سلاسل الإمداد والتمثيل التجاري للشركات الأجنبية التي تدخل السعودية.'
        },
        {
          en: 'We assist enterprises in securing hard-to-source raw materials, negotiating commercial trade agreements, and streamlining distribution logistics.',
          ar: 'نساعد الشركات في تأمين المواد الخام الصعبة وتطوير اتفاقيات التجارة وتسهيل لوجستيات التوزيع.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Commercial Trading', ar: 'التجارة التجارية' }, description: { en: 'Multi-category commodity and product commercial trading.', ar: 'تجارة المنتجات والسلع متعددة الفئات.' } },
      { order: 2, title: { en: 'Product Sourcing', ar: 'توفير المنتجات' }, description: { en: 'Global vendor search and factory audit verification.', ar: 'البحث عن الموردين العالمي والتحقق من تدقيق المصانع.' } },
      { order: 3, title: { en: 'Supply Coordination', ar: 'تنسيق التوريد' }, description: { en: 'End-to-end supply logistics from supplier port to buyer.', ar: 'لوجستيات توريد متكاملة من ميناء المورد حتى المشتري.' } },
      { order: 4, title: { en: 'Distribution', ar: 'التوزيع' }, description: { en: 'Channel partner management and regional warehouse distribution.', ar: 'إدارة شركاء القنوات والتوزيع بمستودعات المنطقة.' } },
      { order: 5, title: { en: 'Business Support', ar: 'دعم الأعمال' }, description: { en: 'Market entry representation and commercial contract support.', ar: 'تمثيل دخول السوق ودعم العقود التجارية.' } },
      { order: 6, title: { en: 'Supplier Coordination', ar: 'تنسيق الموردين' }, description: { en: 'Commercial negotiation and quality assurance oversight.', ar: 'المفاوضات التجارية والإشراف على ضمان الجودة.' } },
      { order: 7, title: { en: 'Market Connectivity', ar: 'الربط بالأسواق' }, description: { en: 'Connecting local Saudi buyers with verified international exporters.', ar: 'ربط المشترين السعوديين بالمصدرين الدوليين المعتمدين.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Procurement Support', ar: 'دعم التوريد' }, description: { en: 'Outsourced corporate procurement for materials and equipment.', ar: 'إدارة التوريد الخارجي للمواد والمعدات للشركات.' } },
      { order: 2, title: { en: 'Commercial Supply', ar: 'التوريد التجاري' }, description: { en: 'Bulk raw material supply for industrial enterprises.', ar: 'توريد المواد الخام السائبة للمؤسسات الصناعية.' } },
      { order: 3, title: { en: 'Trading Partnerships', ar: 'شراكات التجارة' }, description: { en: 'Joint commercial trading ventures and agency representation.', ar: 'مشاريع التجارة المشتركة والتمثيل الوكالي.' } },
      { order: 4, title: { en: 'Distribution Networks', ar: 'شبكات التوزيع' }, description: { en: 'Regional wholesale and retail channel distribution.', ar: 'توزيع قنوات الجملة والتجزئة الإقليمية.' } },
      { order: 5, title: { en: 'Business Partnerships', ar: 'الشراكات التجارية' }, description: { en: 'Cross-border B2B commercial alliances.', ar: 'التحالفات التجارية B2B عبر الحدود.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Flexible Solutions', ar: 'حلول مرنة' }, description: { en: 'Tailored commercial arrangements structured for client requirements.', ar: 'ترتيبات تجارية مخصصة مصممة حسب متطلبات العملاء.' } },
      { order: 2, title: { en: 'Reliable Coordination', ar: 'تنسيق موثوق' }, description: { en: 'Professional handling of trade documentation, LCs, and customs.', ar: 'إدارة مهنية لوثائق التجارة والاعتمادات والجمارك.' } },
      { order: 3, title: { en: 'Market Connectivity', ar: 'الربط بالأسواق' }, description: { en: 'Extensive B2B network across GCC and international markets.', ar: 'شبكة واسعة من الأعمال عبر دول الخليج والأسواق الدولية.' } },
      { order: 4, title: { en: 'Business-Focused Approach', ar: 'نهج يركز على الأعمال' }, description: { en: 'Focusing on cost efficiency and commercial margin enhancement.', ar: 'التركيز على كفاءة التكلفة وتحسين الهوامش التجارية.' } },
      { order: 5, title: { en: 'End-to-End Support', ar: 'دعم من البداية للنهاية' }, description: { en: 'Managing sourcing, shipping, clearance, and delivery.', ar: 'إدارة التوفير والشحن والتخليص والتسليم.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Business Requirement Assessment', ar: 'تقييم متطلبات الأعمال' }, description: { en: 'Understanding client procurement goals and specs.', ar: 'فهم أهداف التوريد والمواصفات الخاصة بالعميل.' } },
      { order: 2, stepNumber: 2, title: { en: 'Sourcing', ar: 'التوفير' }, description: { en: 'Identifying qualified global factories and commercial suppliers.', ar: 'تحديد المصانع العالمية والموردين التجاريين المؤهلين.' } },
      { order: 3, stepNumber: 3, title: { en: 'Supplier Coordination', ar: 'تنسيق الموردين' }, description: { en: 'Requesting RFQs, pricing negotiation, and sample checks.', ar: 'طلب عروض الأسعار والتفاوض وفحص العينات.' } },
      { order: 4, stepNumber: 4, title: { en: 'Commercial Planning', ar: 'التخطيط التجاري' }, description: { en: 'Structuring commercial terms, payment schedules, and transit.', ar: 'صياغة الشروط التجارية وجداول الدفع والنقل.' } },
      { order: 5, stepNumber: 5, title: { en: 'Supply & Distribution', ar: 'التوريد والتوزيع' }, description: { en: 'Executing shipping logistics and customs clearance.', ar: 'تنفيذ لوجستيات الشحن والتخليص الجمركي.' } },
      { order: 6, stepNumber: 6, title: { en: 'Ongoing Support', ar: 'الدعم المستمر' }, description: { en: 'Providing post-delivery account management and re-ordering.', ar: 'تقديم إدارة الحسابات بعد التسليم وإعادة الطلبات.' } }
    ],
    cta: {
      title: { en: "Let's Build Better Business Connections", ar: 'لنزرع علاقات تجارية أفضل' },
      description: {
        en: 'Flexible commercial solutions designed to support businesses, suppliers and market opportunities.',
        ar: 'حلول تجارية مرنة مصممة لدعم الشركات والموردين وفرص السوق.'
      },
      buttonText: { en: 'Talk to Us', ar: 'تحدث معنا' },
      buttonUrl: '/contact'
    }
  },

  // ─── CATEGORY 4: Logistics & Environmental Solutions (category: 'logistics') ─
  {
    name: { en: 'Land Transportation', ar: 'النقل البري' },
    slug: 'land-transportation',
    category: 'logistics',
    shortDescription: {
      en: 'Moving What Matters. Delivering with Confidence.',
      ar: 'نقل ما يهم. التسليم بثقة.'
    },
    icon: '🚛',
    featured: true,
    displayOrder: 13,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'LOGISTICS & ENVIRONMENTAL SOLUTIONS', ar: 'الخدمات اللوجستية والحلول البيئية' },
      title: { en: 'Land Transportation Services', ar: 'خدمات النقل البري' },
      subtitle: { en: 'Moving What Matters. Delivering with Confidence.', ar: 'نقل ما يهم. التسليم بثقة.' },
      description: {
        en: 'Dazz provides land transportation solutions designed to support the movement of goods and materials between suppliers, businesses, project sites and destinations. Our focus is on dependable transportation coordination and timely delivery.',
        ar: 'تقدم داز حلول النقل البري المصممة لدعم حركة البضائع والمواد بين الموردين والشركات ومواقع المشاريع. نركز على النقل الموثوق والتسليم في الوقت المحدد.'
      },
      ctaPrimary: { text: { en: 'Request Transportation', ar: 'طلب نقل' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Fleet Details', ar: 'تفاصيل الأسطول' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'ROAD FREIGHT & LOGISTICS', ar: 'الشحن البري واللوجستيات' },
      title: { en: 'Reliable Heavy Freight & Cargo Transportation', ar: 'نقل البضائع والشحنات الثقيلة الموثوق' },
      mainDescription: {
        en: 'Dazz provides land transportation solutions designed to support the movement of goods and materials between suppliers, businesses, project sites and destinations.',
        ar: 'تقدم داز حلول النقل البري المصممة لدعم حركة البضائع والمواد بين الموردين والشركات ومواقع المشاريع.'
      },
      paragraphs: [
        {
          en: 'Our transportation fleet includes flatbed trailers, curtain-side trailers, lowbeds, and heavy tip trucks operating across all provinces of Saudi Arabia.',
          ar: 'يتضمن أسطول النقل لدينا شاحنات مسطحة وشاحنات الستائر وتريلات منخفضة وقاطرات قلاب تعمل عبر جميع مناطق السعودية.'
        },
        {
          en: 'We provide full truckload (FTL), project cargo movement, and inter-city haulage backed by GPS tracking and experienced drivers.',
          ar: 'نقدم نقل الشحنات الكبيرة (FTL) ونقل معدات المشاريع والشحن بين المدن مدعوماً بتتبع GPS وسائقين ذوي خبرة.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Goods Transportation', ar: 'نقل البضائع' }, description: { en: 'Palletized consumer goods and dry cargo transportation.', ar: 'نقل البضائع الاستهلاكية والبضائع الجافة على طبالي.' } },
      { order: 2, title: { en: 'Material Transportation', ar: 'نقل المواد' }, description: { en: 'Bulk aggregate, cement, steel rebar, and raw material transport.', ar: 'نقل الركام والأسمنت وحديد التسليح والمواد الخام.' } },
      { order: 3, title: { en: 'Project Transportation', ar: 'نقل المشاريع' }, description: { en: 'Over-dimensional cargo and heavy machinery lowbed transport.', ar: 'نقل الأحمال الضخمة والمعدات الثقيلة بالشاحنات المنخفضة.' } },
      { order: 4, title: { en: 'Commercial Transportation', ar: 'النقل التجاري' }, description: { en: 'Distribution transport for retail chains and commercial clients.', ar: 'نقل التوزيع لسلاسل التجزئة والعملاء التجار.' } },
      { order: 5, title: { en: 'Local Transportation', ar: 'النقل المحلي' }, description: { en: 'Intra-city short haul freight delivery.', ar: 'توصيل الشحنات السريعة داخل المدن.' } },
      { order: 6, title: { en: 'Long-Distance Transportation', ar: 'النقل بين المدن (الطويل)' }, description: { en: 'Inter-state heavy haulage across KSA and GCC borders.', ar: 'نقل الثقيل عبر مناطق السعودية والحدود الخليجية.' } },
      { order: 7, title: { en: 'Delivery Coordination', ar: 'تنسيق التسليم' }, description: { en: 'Real-time GPS tracking and waypoint route management.', ar: 'تتبع مباشر عبر GPS وإدارة مسارات الشحنات.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Construction Materials', ar: 'مواد البناء' }, description: { en: 'Steel, precast elements, piping, and concrete transport.', ar: 'نقل حديد التسليح والخرسانة المسبقة والأنابيب.' } },
      { order: 2, title: { en: 'Commercial Goods', ar: 'البضائع التجارية' }, description: { en: 'FMCG packaged products, electronics, and apparel freight.', ar: 'نقل الأغذية والمشروبات والإلكترونيات والملابس.' } },
      { order: 3, title: { en: 'Industrial Materials', ar: 'المواد الصناعية' }, description: { en: 'Chemical drums, factory machinery, and raw polymers.', ar: 'نقل براميل المواد الكيميائية وآلات المصانع.' } },
      { order: 4, title: { en: 'Trading Products', ar: 'منتجات التجارة' }, description: { en: 'Imported food commodities and agricultural produce.', ar: 'نقل الأغذية والمحاصيل الزراعية المستوردة.' } },
      { order: 5, title: { en: 'Project Supplies', ar: 'مستلزمات المشاريع' }, description: { en: 'Site cabin mobilization and utility infrastructure piping.', ar: 'نقل الكبائن المؤقتة وأنابيب البنية التحتية.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Reliable Transportation', ar: 'نقل موثوق' }, description: { en: 'Safety-checked truck fleet adhering to Saudi Transport General Authority standards.', ar: 'أسطول شاحنات مفحوص يطابق معايير الهيئة العامة للنقل.' } },
      { order: 2, title: { en: 'Timely Delivery', ar: 'تسليم في الوقت المحدد' }, description: { en: 'Guaranteed delivery windows for project timeline compliance.', ar: 'أوقات تسليم مضمونة لالتزام المواعيد.' } },
      { order: 3, title: { en: 'Route Coordination', ar: 'تنسيق المسارات' }, description: { en: 'Optimized highway routing avoiding urban traffic restrictions.', ar: 'مسارات محسّنة تتجنب أوقات حظر الشاحنات.' } },
      { order: 4, title: { en: 'Flexible Solutions', ar: 'حلول مرنة' }, description: { en: 'Single trailer trips to contract fleet leasing.', ar: 'من شحنات النقل الفردية إلى استئجار أسطول كامل.' } },
      { order: 5, title: { en: 'Project Support', ar: 'دعم المشاريع' }, description: { en: 'Dedicated fleet dispatchers stationed on contractor sites.', ar: 'منسقو أسطول مخصصون بمواقع المقاولين.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Transportation Planning', ar: 'تخطيط النقل' }, description: { en: 'Assessing freight weight, axle limitations, and trailer type.', ar: 'تقييم وزن الشحنة وحدود المحاور ونوع المقطورة.' } },
      { order: 2, stepNumber: 2, title: { en: 'Pickup Coordination', ar: 'تنسيق الاستلام' }, description: { en: 'Dispatching truck to factory or port loading dock.', ar: 'إرسال الشاحنة لموقع المصنع أو رصيف التحميل بالميناء.' } },
      { order: 3, stepNumber: 3, title: { en: 'Route Planning', ar: 'تخطيط المسار' }, description: { en: 'Securing transport permits for heavy over-dimensional loads.', ar: 'استخراج تصاريح النقل للأحمال الثقيلة والضخمة.' } },
      { order: 4, stepNumber: 4, title: { en: 'Transportation', ar: 'النقل' }, description: { en: 'In-transit execution with GPS telemetry tracking.', ar: 'التنفيذ أثناء الطريق مع التتبع المباشر.' } },
      { order: 5, stepNumber: 5, title: { en: 'Delivery', ar: 'التسليم' }, description: { en: 'Offloading cargo at recipient warehouse or jobsite.', ar: 'تفريغ الشحنة بمستودع المستلم أو موقع العمل.' } },
      { order: 6, stepNumber: 6, title: { en: 'Delivery Confirmation', ar: 'تأكيد التسليم' }, description: { en: 'Signed Proof of Delivery (POD) documentation.', ar: 'توثيق إثبات التسليم (POD) الموقع.' } }
    ],
    cta: {
      title: { en: 'Your Goods. Our Commitment.', ar: 'بضائعكم. التزامنا.' },
      description: {
        en: 'Dependable land transportation solutions connecting businesses, projects and markets.',
        ar: 'حلول نقل بري موثوقة تربط الشركات والمشاريع والأسواق.'
      },
      buttonText: { en: 'Request Transportation', ar: 'طلب نقل' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Air and Water Disinfection Systems', ar: 'أنظمة تطهير الهواء والماء' },
    slug: 'air-and-water-disinfection-systems',
    category: 'logistics',
    shortDescription: {
      en: 'Cleaner Air. Safer Water. Healthier Environments.',
      ar: 'هواء أنظف. ماء آمن. بيئات صحية.'
    },
    icon: '💧',
    featured: false,
    displayOrder: 14,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'equipment', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'equipment', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'LOGISTICS & ENVIRONMENTAL SOLUTIONS', ar: 'الخدمات اللوجستية والحلول البيئية' },
      title: { en: 'Air & Water Disinfection Systems', ar: 'أنظمة تطهير الهواء والماء' },
      subtitle: { en: 'Cleaner Air. Safer Water. Healthier Environments.', ar: 'هواء أنظف. ماء آمن. بيئات صحية.' },
      description: {
        en: 'Dazz provides air and water disinfection system solutions designed to support cleaner and safer environments across commercial, industrial and other operational settings.',
        ar: 'تقدم داز حلول أنظمة تطهير الهواء والماء المصممة لدعم بيئات أنظف وأكثر أماناً عبر القطاعات التجارية والصناعية.'
      },
      ctaPrimary: { text: { en: 'Discuss Your Requirement', ar: 'ناقش متطلباتك' }, url: '/contact' },
      ctaSecondary: { text: { en: 'System Specs', ar: 'مواصفات الأنظمة' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'ENVIRONMENTAL HEALTH & DISINFECTION', ar: 'الصحة البيئية والتطهير' },
      title: { en: 'Advanced Air & Water Purification Systems', ar: 'أنظمة متقدمة لتنقية وتطهير الهواء والماء' },
      mainDescription: {
        en: 'Dazz provides air and water disinfection system solutions designed to support cleaner and safer environments across commercial, industrial and other operational settings.',
        ar: 'تقدم داز حلول أنظمة تطهير الهواء والماء المصممة لدعم بيئات أنظف وأكثر أماناً عبر القطاعات التجارية والصناعية.'
      },
      paragraphs: [
        {
          en: 'Our disinfection technologies include UV-C germicidal irradiation, ozone water purification, and HEPA air filtration systems.',
          ar: 'تتضمن تقنيات التطهير لدينا الأشعة فوق البنفسجية UV-C وتنقية المياه بالأوزون وأنظمة تنقية الهواء HEPA.'
        },
        {
          en: 'We engineer turnkey disinfection systems for hospitals, food processing facilities, commercial office towers, and water utilities.',
          ar: 'نهندس أنظمة تطهير شاملة للمستشفيات ومصانع الأغذية والأبراج التجارية ومرافق المياه.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Air Disinfection Systems', ar: 'أنظمة تطهير الهواء' }, description: { en: 'In-duct UV-C HVAC sterilization and portable HEPA air scrubbers.', ar: 'تعقيم التكييف بالأشعة فوق البنفسجية وأجهزة تنقية الهواء المحمولة.' } },
      { order: 2, title: { en: 'Water Disinfection Systems', ar: 'أنظمة تطهير المياه' }, description: { en: 'UV water purifiers, chlorination dosing systems, and ozone treatment.', ar: 'أجهزة أوزون وتعقيم بالأشعة فوق البنفسجية وأنظمة الكلورة.' } },
      { order: 3, title: { en: 'Environmental Treatment Solutions', ar: 'حلول المعالجة البيئية' }, description: { en: 'Odour control scrubbers and industrial bio-filtration.', ar: 'أجهزة التحكم بالروائح والفلاتر الحيوية الصناعية.' } },
      { order: 4, title: { en: 'System Supply', ar: 'توريد الأنظمة' }, description: { en: 'Sourcing certified environmental disinfection machinery and spares.', ar: 'توريد معدات التطهير البيئية وقطع الغيار المعتمدة.' } },
      { order: 5, title: { en: 'Installation Support', ar: 'دعم التركيب' }, description: { en: 'Mechanical and electrical installation of treatment units.', ar: 'التركيب الميكانيكي والكهربائي لوحدات المعالجة.' } },
      { order: 6, title: { en: 'Maintenance Support', ar: 'دعم الصيانة' }, description: { en: 'Consumable replacement (UV lamps, quartz sleeves, filters) and calibration.', ar: 'استبدال المستهلكات (لمبات UV، الفلاتر) والمعايرة.' } }
    ],
    equipment: [
      { order: 1, name: { en: 'Air Disinfection Units', ar: 'وحدات تطهير الهواء' }, description: { en: 'HVAC in-duct germicidal UV-C light fixtures.', ar: 'أجهزة الأشعة فوق البنفسجية UV-C لمجاري التكييف.' }, specification: { en: '99.9% airborne pathogen destruction', ar: 'القضاء على 99.9% من الميكروبات المنقولة جوياً' } },
      { order: 2, name: { en: 'Water Disinfection Reactors', ar: 'مفاعلات تطهير المياه' }, description: { en: 'Stainless steel UV water sterilization chambers.', ar: 'غرف تعقيم المياه من الصلب المقاوم للصدأ بالأشعة UV.' }, specification: { en: 'Flow rates from 5 m³/hr to 500 m³/hr', ar: 'تدفق من 5 م³/ساعة إلى 500 م³/ساعة' } },
      { order: 3, name: { en: 'Treatment Equipment', ar: 'معدات المعالجة' }, description: { en: 'Ozone generators and chemical metering dosing pumps.', ar: 'مولدات الأوزون ومضخات معايرة الكيمياويات.' }, specification: { en: 'Automatic ORP & pH feedback control', ar: 'تحكم تلقائي ومراقبة الحموضة والتحليل' } },
      { order: 4, name: { en: 'Supporting Equipment', ar: 'المعدات المساندة' }, description: { en: 'Quartz sleeves, ballast controllers, and sensor probes.', ar: 'أنابيب الكوارتز، المحولات، ومستشعرات الفحص.' }, specification: { en: 'IP65 waterproof rated enclosures', ar: 'هياكل مقاومة للماء بدرجة IP65' } }
    ],
    applications: [
      { order: 1, title: { en: 'Commercial Buildings', ar: 'المباني التجارية' }, description: { en: 'Office towers, shopping malls, and airport terminals.', ar: 'الأبراج المكتبية والمراكز التجارية وصالات المطارات.' } },
      { order: 2, title: { en: 'Industrial Facilities', ar: 'المنشآت الصناعية' }, description: { en: 'Food and beverage bottling plants, pharmaceutical cleanrooms.', ar: 'مصانع الأغذية والمشروبات والمختبرات الدوائية.' } },
      { order: 3, title: { en: 'Hospitality', ar: 'الضيافة' }, description: { en: 'Hotel swimming pools, spa water, and guest room HVAC.', ar: 'حمامات سباحة الفنادق ومياه السبا وتكييف الغرف.' } },
      { order: 4, title: { en: 'Healthcare Environments', ar: 'البيئات الصحية' }, description: { en: 'Hospital operating theaters and isolation ward air systems.', ar: 'غرف عمليات المستشفيات وأجهزة تكييف العزل.' } },
      { order: 5, title: { en: 'Public Facilities', ar: 'المرافق العامة' }, description: { en: 'Schools, sports arenas, and government complexes.', ar: 'المدارس والصالات الرياضية والمجمعات الحكومية.' } },
      { order: 6, title: { en: 'Water Treatment Applications', ar: 'تطبيقات معالجة المياه' }, description: { en: 'Desalination plant post-treatment and wastewater reuse.', ar: 'معالجة ما بعد التحلية وإعادة استخدام مياه الصرف.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Cleaner Environments', ar: 'بيئات أنظف' }, description: { en: 'Proactively eliminates viruses, bacteria, mold, and algae.', ar: 'يقضي بفاعلية على الفيروسات والبكتيريا والعفن والفيطريات.' } },
      { order: 2, title: { en: 'Improved Hygiene', ar: 'تحسين المستوى الصحي' }, description: { en: 'Chemical-free disinfection protecting human health.', ar: 'تطهير خالي من المواد الكيميائية يحمي صحة الإنسان.' } },
      { order: 3, title: { en: 'System Efficiency', ar: 'كفاءة النظام' }, description: { en: 'Low energy consumption UV lamps with 12,000 hour lifespan.', ar: 'لمبات UV منخفضة استهلاك الطاقة بعمر 12,000 ساعة.' } },
      { order: 4, title: { en: 'Reliable Solutions', ar: 'حلول موثوقة' }, description: { en: 'Robust stainless steel 316L pressure vessel construction.', ar: 'هياكل ضغط متينة من الصلب 316L المقاوم للصدأ.' } },
      { order: 5, title: { en: 'Application-Focused Design', ar: 'تصميم يركز على التطبيق' }, description: { en: 'Custom engineered flow rates for client water piping.', ar: 'معدلات تدفق مهندسة خصيصاً لأنابيب مياه العميل.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Requirement Assessment', ar: 'تقييم المتطلبات' }, description: { en: 'Testing water transmittance (UVT) or air CFM flow rate.', ar: 'اختبار نفاذية المياه (UVT) أو معدل تدفق الهواء.' } },
      { order: 2, stepNumber: 2, title: { en: 'System Selection', ar: 'اختيار النظام' }, description: { en: 'Sizing UV dosage (mJ/cm²) or ozone dosage requirement.', ar: 'تحديد جرعة الأشعة فوق البنفسجية أو الأوزون المطلوبة.' } },
      { order: 3, stepNumber: 3, title: { en: 'Equipment Supply', ar: 'توريد المعدات' }, description: { en: 'Dispatching disinfection skid reactors and control panels.', ar: 'إرسال مفاعلات التطهير ولوحات التحكم.' } },
      { order: 4, stepNumber: 4, title: { en: 'Installation', ar: 'التركيب' }, description: { en: 'Flange plumbing connections and sensor wiring.', ar: 'توصيل الأنابيب والشفاه وتوصيلات الحساسات.' } },
      { order: 5, stepNumber: 5, title: { en: 'Testing', ar: 'الاختبار' }, description: { en: 'Microbiological water/air sampling to prove log-reduction.', ar: 'أخذ عينات ميكروبيولوجية للمياه والهواء لإثبات التعقيم.' } },
      { order: 6, stepNumber: 6, title: { en: 'Maintenance Support', ar: 'دعم الصيانة' }, description: { en: 'Annual maintenance contracts for lamp and sleeve cleaning.', ar: 'عقود صيانة سنوية لتنظيف اللمبات والأنابيب.' } }
    ],
    cta: {
      title: { en: 'Creating Cleaner Environments', ar: 'إنشاء بيئات أكثر نظافة' },
      description: {
        en: 'Disinfection solutions designed to support cleaner air, safer water and healthier operational environments.',
        ar: 'حلول تطهير مصممة لدعم هواء أنظف ومياه أكثر أماناً وبيئات عمل صحية.'
      },
      buttonText: { en: 'Discuss Your Requirement', ar: 'ناقش متطلباتك' },
      buttonUrl: '/contact'
    }
  },

  {
    name: { en: 'Waste Management', ar: 'إدارة النفايات' },
    slug: 'waste-management',
    category: 'logistics',
    shortDescription: {
      en: 'Responsible Waste Solutions for a Cleaner Future.',
      ar: 'حلول نفايات مسؤولة لمستقبل أنظف.'
    },
    icon: '♻️',
    featured: false,
    displayOrder: 15,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'process', 'cta'],
    hero: {
      eyebrow: { en: 'LOGISTICS & ENVIRONMENTAL SOLUTIONS', ar: 'الخدمات اللوجستية والحلول البيئية' },
      title: { en: 'Waste Management Solutions', ar: 'حلول إدارة النفايات' },
      subtitle: { en: 'Responsible Waste Solutions for a Cleaner Future.', ar: 'حلول نفايات مسؤولة لمستقبل أنظف.' },
      description: {
        en: 'Dazz provides waste management solutions focused on efficient waste collection, handling, transportation and responsible management. Our services are designed to support cleaner worksites and more organized waste operations.',
        ar: 'تقدم داز حلول إدارة النفايات التي تركز على الجمع الكفء والنقل والتعامل والمسؤولية البيئية. مصممة لدعم مواقع عمل أنظف وعمليات أكثر تنظيماً.'
      },
      ctaPrimary: { text: { en: 'Request Waste Services', ar: 'طلب خدمات النفايات' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Waste Management Options', ar: 'خيارات إدارة النفايات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'ENVIRONMENTAL & WORKSITE SERVICES', ar: 'الخدمات البيئية ومواقع العمل' },
      title: { en: 'Responsible Worksite Waste Solutions', ar: 'حلول نفايات مواقع العمل المسؤولة' },
      mainDescription: {
        en: 'Dazz provides waste management solutions focused on efficient waste collection, handling, transportation and responsible management.',
        ar: 'تقدم داز حلول إدارة النفايات التي تركز على الجمع الكفء والنقل والتعامل والمسؤولية البيئية.'
      },
      paragraphs: [
        {
          en: 'Our services cover skip bin rentals, construction debris haulage, industrial non-hazardous waste sorting, and municipal landfill disposal.',
          ar: 'تغطي خدماتنا تأجير الحاويات ونقل أنقاض البناء وفرز النفايات الصناعية غير الخطرة والتخلص منها في المرامي المعتمدة.'
        },
        {
          en: 'We comply with GAMEP and Saudi municipal environmental laws, providing manifest documentation for every jobsite pickup.',
          ar: 'نلتزم بالأنظمة البيئية السعودية والبلدية مع تقديم وثائق مانفيست كاملة لجميع عمليات الرفع من الموقع.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Waste Collection', ar: 'جمع النفايات' }, description: { en: 'Scheduled skip placement and on-site container clearance.', ar: 'وضع الحاويات المجدول وتفريغ الحاويات بموقع العمل.' } },
      { order: 2, title: { en: 'Waste Transportation', ar: 'نقل النفايات' }, description: { en: 'Fleet of hook-loader trucks and heavy dump trailers.', ar: 'أسطول شاحنات هوك لودر وقاطرات القلاب الثقيلة.' } },
      { order: 3, title: { en: 'Construction Waste Management', ar: 'إدارة نفايات البناء' }, description: { en: 'Removal of concrete rubble, rebar scrap, timber, and excavated soil.', ar: 'إزالة أنقاض الخرسانة وخردة الحديد والأخشاب ومخلفات الحفر.' } },
      { order: 4, title: { en: 'Industrial Waste Management', ar: 'إدارة النفايات الصناعية' }, description: { en: 'Handling factory packaging waste, scrap plastics, and metal.', ar: 'التعامل مع نفايات التغليف بالمصانع وخردة البلاستيك والمعادن.' } },
      { order: 5, title: { en: 'Commercial Waste Management', ar: 'إدارة النفايات التجارية' }, description: { en: 'Retail mall and commercial property waste contract services.', ar: 'عقود إدارة النفايات للمراكز التجارية والعقارات.' } },
      { order: 6, title: { en: 'Waste Removal', ar: 'إزالة النفايات' }, description: { en: 'Rapid site clearance for emergency jobsite debris.', ar: 'إزالة سريعة لأنقاض أنشطة الموقع الطارئة.' } },
      { order: 7, title: { en: 'Waste Handling', ar: 'التعامل مع النفايات' }, description: { en: 'Segregating recyclable materials from landfill spoil.', ar: 'فصل المواد القابلة لإعادة التدوير عن نفايات المرامي.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Construction Projects', ar: 'مشاريع البناء' }, description: { en: 'Jobsite excavation clearing and structural demolition debris.', ar: 'تنظيف الحفريات بالموقع وأنقاض الهدم الإنشائي.' } },
      { order: 2, title: { en: 'Industrial Facilities', ar: 'المنشآت الصناعية' }, description: { en: 'Factory production waste clearance and packing materials.', ar: 'تخليص نفايات الإنتاج ومواد التغليف بالصانع.' } },
      { order: 3, title: { en: 'Commercial Properties', ar: 'العقارات التجارية' }, description: { en: 'Office complex and retail mall trash compactors.', ar: 'مكبس نفايات المجمعات المكتبية والمراكز التجارية.' } },
      { order: 4, title: { en: 'Infrastructure Projects', ar: 'مشاريع البنية التحتية' }, description: { en: 'Highway excavation spoil haulage and ROW cleaning.', ar: 'نقل ناتج حفر الطرق السريعة وتنظيف المسارات.' } },
      { order: 5, title: { en: 'Project Sites', ar: 'مواقع المشاريع' }, description: { en: 'Temporary camp waste management and general jobsite cleanup.', ar: 'إدارة نفايات المجمعات المؤقتة وتنظيف الموقع.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Cleaner Worksites', ar: 'مواقع عمل أنظف' }, description: { en: 'Keeps job sites organized, safe, and compliant with safety officers.', ar: 'يحافظ على تنظيم وأمان موقع العمل ومطابقة ضباط السلامة.' } },
      { order: 2, title: { en: 'Reliable Collection', ar: 'جمع موثوق' }, description: { en: 'Never suffer from overflowing skips or delayed site pickups.', ar: 'لن تعاني أبداً من امتلاء الحاويات أو تأخر الرفع من الموقع.' } },
      { order: 3, title: { en: 'Efficient Transportation', ar: 'نقل كفء' }, description: { en: 'High capacity roll-off containers minimizing transport trips.', ar: 'حاويات كبيرة الحجم تقلل عدد رحلات النقل.' } },
      { order: 4, title: { en: 'Responsible Handling', ar: 'تعامل مسؤول' }, description: { en: 'Diverting metal and timber scrap to licensed recycling facilities.', ar: 'تحويل خردة المعادن والأخشاب لمرافق تدوير مرخصة.' } },
      { order: 5, title: { en: 'Project-Based Solutions', ar: 'حلول تركز على المشروع' }, description: { en: 'Customized waste management plans matching project environmental specs.', ar: 'خطط إدارة نفايات مخصصة متوافقة مع البيئة.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Waste Assessment', ar: 'تقييم النفايات' }, description: { en: 'Estimating site waste volume and container requirements.', ar: 'تقدير حجم نفايات الموقع ومتطلبات الحاويات.' } },
      { order: 2, stepNumber: 2, title: { en: 'Collection', ar: 'الجمع' }, description: { en: 'Placing heavy-duty skip containers at designated site spots.', ar: 'وضع حاويات شديدة التحمل بالنقاط المحددة بالموقع.' } },
      { order: 3, stepNumber: 3, title: { en: 'Transportation', ar: 'النقل' }, description: { en: 'Hauling filled containers using authorized hook-loader trucks.', ar: 'سحب الحاويات الممتلئة لشاحنات الهوك لودر المعتمدة.' } },
      { order: 4, stepNumber: 4, title: { en: 'Sorting & Handling', ar: 'الفرز والتعامل' }, description: { en: 'Sorting recyclable scrap metal, concrete, and timber.', ar: 'فرز خردة المعادن والخرسانة والأخشاب لإعادة التدوير.' } },
      { order: 5, stepNumber: 5, title: { en: 'Responsible Disposal', ar: 'التخلص المسؤول' }, description: { en: 'Final dumping at designated municipal authorized landfill sites.', ar: 'التفريغ النهائي في المرامي المعتمدة من البلدية.' } }
    ],
    cta: {
      title: { en: 'Cleaner Sites. Responsible Solutions.', ar: 'مواقع أنظف. حلول مسؤولة.' },
      description: {
        en: 'Waste management solutions designed to support cleaner operations and a more responsible future.',
        ar: 'حلول إدارة النفايات المصممة لدعم عمليات أنظف ومستقبل أكثر مسؤولية.'
      },
      buttonText: { en: 'Request Waste Services', ar: 'طلب خدمات النفايات' },
      buttonUrl: '/contact'
    }
  }
];

async function seedServices() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dazz';
  console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:[^:@]+@/, ':****@')}`);
  
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.\n');

    for (const serviceData of servicesData) {
      console.log(`Processing service: "${serviceData.name.en}" (${serviceData.slug})...`);

      const existingDoc = await Service.findOne({ slug: serviceData.slug });
      
      const payload: SafeAny = {
        ...serviceData,
        status: 'published',
        translationStatus: { ar: 'completed' }
      };

      // Preserve existing admin-edited media images if document exists
      if (existingDoc) {
        if (existingDoc.hero?.media) {
          payload.hero.media = existingDoc.hero.media;
        }
        if (existingDoc.introduction?.image) {
          payload.introduction.image = existingDoc.introduction.image;
        }
        if (existingDoc.cta?.backgroundImage) {
          payload.cta.backgroundImage = existingDoc.cta.backgroundImage;
        }
        if (existingDoc.gallery && existingDoc.gallery.length > 0) {
          payload.gallery = existingDoc.gallery;
        }
      }

      const result = await Service.findOneAndUpdate(
        { slug: serviceData.slug },
        payload,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`  ✓ Successfully seeded/updated: "${result.name.en}" (Category: ${result.category})`);
    }

    const totalCount = await Service.countDocuments({ status: 'published' });
    console.log(`\n🎉 Seeding finished! Total published services in database: ${totalCount}`);

  } catch (error) {
    console.error('❌ Error seeding services:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedServices();
