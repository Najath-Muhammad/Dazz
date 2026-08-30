import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Service from '../models/Service';
import { autoTranslate } from '../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../utils/translatableFields';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const servicesData = [
  {
    name: {
      en: 'Ready Mix Concrete',
      ar: 'الخرسانة الجاهزة'
    },
    slug: 'ready-mix-concrete',
    category: 'construction',
    shortDescription: {
      en: 'Quality Concrete. Reliable Supply. Every Project.',
      ar: 'خرسانة عالية الجودة. توريد موثوق. لكل مشروع.'
    },
    icon: '🏗️',
    featured: true,
    displayOrder: 1,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'cta'],
    hero: {
      eyebrow: { en: 'DAZZ TRADELINK INTERNATIONAL', ar: 'داز تريدلينك الدولية' },
      title: { en: 'Ready Mix Concrete', ar: 'الخرسانة الجاهزة' },
      subtitle: { en: 'Quality Concrete. Reliable Supply. Every Project.', ar: 'خرسانة عالية الجودة. توريد موثوق. لكل مشروع.' },
      description: {
        en: 'DAZZ Tradlink International provides reliable ready mix concrete solutions for a wide range of construction and infrastructure projects across the Kingdom of Saudi Arabia.',
        ar: 'تقدم داز تريدلينك الدولية حلول خرسانة جاهزة موثوقة لمجموعة واسعة من مشاريع البناء والبنية التحتية عبر المملكة العربية السعودية.'
      },
      ctaPrimary: { text: { en: 'Contact Us', ar: 'تواصل معنا' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Our Projects', ar: 'مشاريعنا' }, url: '/projects' }
    },
    introduction: {
      sectionLabel: { en: 'ABOUT THE SERVICE', ar: 'عن الخدمة' },
      title: { en: 'Reliable & Quality Ready Mix Concrete', ar: 'خرسانة جاهزة موثوقة وعالية الجودة' },
      mainDescription: {
        en: 'DAZZ Tradlink International provides reliable ready mix concrete solutions for a wide range of construction and infrastructure projects across the Kingdom of Saudi Arabia.',
        ar: 'تقدم داز تريدلينك الدولية حلول خرسانة جاهزة موثوقة لمجموعة واسعة من مشاريع البناء والبنية التحتية عبر المملكة العربية السعودية.'
      },
      paragraphs: [
        {
          en: 'Our ready mix concrete operations are focused on delivering consistent-quality concrete, dependable supply, and efficient delivery to meet the demanding requirements of modern construction projects.',
          ar: 'تركز عمليات الخرسانة الجاهزة لدينا على تقديم خرسانة متسقة الجودة، وتوريد موثوق، وتوصيل كفء لتلبية المتطلبات الصارمة لمشاريع البناء الحديثة.'
        },
        {
          en: 'From foundations and structural works to roads, commercial developments, industrial facilities, and infrastructure projects, we provide concrete solutions tailored to project requirements.',
          ar: 'من الأساسات والأعمال الإنشائية إلى الطرق والتطوير التجاري والمنشآت الصناعية ومشاريع البنية التحتية، نقدم حلول خرسانية مخصصة لتلبية متطلبات المشاريع.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Ready Mix Concrete Production', ar: 'إنتاج الخرسانة الجاهزة' }, description: { en: 'High-capacity production ensuring consistent specifications.', ar: 'إنتاج عالي السعة يضمن مواصفات متسقة.' } },
      { order: 2, title: { en: 'Customized Concrete Mixes', ar: 'خلطات خرسانية مخصصة' }, description: { en: 'Tailored mix designs engineered for specific strength and durability needs.', ar: 'تصاميم خلطات مخصصة مصممة لمتطلبات القوة والمتانة الخاصة.' } },
      { order: 3, title: { en: 'Concrete Supply & Delivery', ar: 'توريد وتوصيل الخرسانة' }, description: { en: 'Prompt on-site delivery utilizing a modern transit mixer fleet.', ar: 'توصيل سريع في الموقع باستخدام أسطول خلاطات حديث.' } },
      { order: 4, title: { en: 'Project-Based Concrete Solutions', ar: 'حلول خرسانية مخصصة للمشاريع' }, description: { en: 'End-to-end supply coordination matching your project schedule.', ar: 'تنسيق توريد شامل يتوافق مع جدول مشروعك.' } },
      { order: 5, title: { en: 'Continuous Supply for Large Projects', ar: 'توريد مستمر للمشاريع الكبيرة' }, description: { en: 'Uninterrupted concrete pour support for mega-structures and infrastructure.', ar: 'دعم صب الخرسانة المستمر للهياكل الضخمة والبنية التحتية.' } },
      { order: 6, title: { en: 'Concrete Pumping Support', ar: 'دعم ضخ الخرسانة' }, description: { en: 'Mobile and stationary pumping equipment for high-rise and deep pours.', ar: 'معدات ضخ متحركة وثابتة للمباني العالية والصب العميق.' } },
      { order: 7, title: { en: 'Scheduled & On-Demand Deliveries', ar: 'تسليم مجدول وحسب الطلب' }, description: { en: 'Flexible delivery options to optimize site efficiency.', ar: 'خيارات تسليم مرنة لتحسين كفاءة الموقع.' } },
      { order: 8, title: { en: 'Quality-Controlled Production', ar: 'إنتاج خاضع لمراقبة الجودة' }, description: { en: 'Rigorous batch testing and material verification at every stage.', ar: 'اختبارات خلط دقيقة والتحقق من المواد في كل مرحلة.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Residential Construction', ar: 'البناء السكني' }, description: { en: 'Foundations, slabs, and structural frames for residential buildings.', ar: 'الأساسات والبلاطات والهياكل الإنشائية للمباني السكنية.' } },
      { order: 2, title: { en: 'Commercial Developments', ar: 'المشاريع التجارية' }, description: { en: 'High-strength concrete for towers, malls, and office complexes.', ar: 'خرسانة عالية القوة للأبراج والمجمعات التجارية والمكاتب.' } },
      { order: 3, title: { en: 'Industrial Facilities', ar: 'المنشآت الصناعية' }, description: { en: 'Heavy-duty floors, machinery pads, and industrial plants.', ar: 'أرضيات شديدة التحمل وقواعد الآلات والمصانع الصناعية.' } },
      { order: 4, title: { en: 'Infrastructure Projects', ar: 'مشاريع البنية التحتية' }, description: { en: 'Bridges, culverts, utility ducts, and public works.', ar: 'الجسور والعبارات وقنوات المرافق والأعمال العامة.' } },
      { order: 5, title: { en: 'Road Construction', ar: 'إنشاء الطرق' }, description: { en: 'Pavement layers, curbs, barriers, and highway structures.', ar: 'طبقات الرصف والأرصفة والحواجز وهياكل الطرق السريعة.' } },
      { order: 6, title: { en: 'Foundations', ar: 'الأساسات' }, description: { en: 'Mass concrete pours, rafts, and deep pile caps.', ar: 'صب الخرسانة الضخمة والقواعد الشريطية وكراسي الخوازيق.' } },
      { order: 7, title: { en: 'Structural Works', ar: 'الأعمال الإنشائية' }, description: { en: 'Beams, columns, retaining walls, and pre-cast components.', ar: 'الجسور والأعمدة والجدران الاستنادية والمكونات مسبقة الصنع.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Consistent Quality', ar: 'جودة متسقة' }, description: { en: 'Advanced computerized batching plants ensure exact mix specifications.', ar: 'مصانع خلط محوسبة متقدمة تضمن مواصفات خلط دقيقة.' } },
      { order: 2, title: { en: 'Project-Scale Supply', ar: 'توريد بمقياس المشاريع' }, description: { en: 'Capacity to handle small custom orders to mega infrastructure projects.', ar: 'القدرة على التعامل مع الطلبات الخاصة الصغيرة حتى المشاريع الضخمة.' } },
      { order: 3, title: { en: 'Reliable Delivery', ar: 'توصيل موثوق' }, description: { en: 'Modern mixer fleet guarantees timely arrival and slump preservation.', ar: 'أسطول خلاطات حديث يضمن الوصول في الوقت المحدد والحفاظ على القوام.' } },
      { order: 4, title: { en: 'Quality-Focused Operations', ar: 'عمليات تركز على الجودة' }, description: { en: 'Continuous lab testing for compressive strength and workability.', ar: 'اختبارات معملية مستمرة لقوة الضغط وقابلية التشغيل.' } }
    ],
    cta: {
      title: { en: 'Delivering Concrete That Builds the Future', ar: 'تقديم خرسانة تبني المستقبل' },
      description: {
        en: 'We are committed to delivering high-quality ready mix concrete solutions that build stronger structures and better communities.',
        ar: 'نحن ملتزمون بتقديم حلول خرسانة جاهزة عالية الجودة تبني هياكل أقوى ومجتمعات أفضل.'
      },
      buttonText: { en: 'Request Concrete Supply', ar: 'طلب توريد الخرسانة' },
      buttonUrl: '/contact'
    }
  },
  {
    name: {
      en: 'Piling & DTH Drilling',
      ar: 'أعمال الخوازيق والحفر بتقنية DTH'
    },
    slug: 'piling-and-dth-drilling',
    category: 'construction',
    shortDescription: {
      en: 'Strong Foundations. Precise Drilling. Reliable Solutions.',
      ar: 'أساسات قوية. حفر دقيق. حلول موثوقة.'
    },
    icon: '⚙️',
    featured: true,
    displayOrder: 2,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'process', 'equipment', 'whyChooseUs', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'process', 'equipment', 'whyChooseUs', 'cta'],
    hero: {
      eyebrow: { en: 'SPECIALIZED FOUNDATION SERVICES', ar: 'خدمات الأساسات المتخصصة' },
      title: { en: 'Piling & DTH Drilling', ar: 'أعمال الخوازيق والحفر بتقنية DTH' },
      subtitle: { en: 'Strong Foundations. Precise Drilling. Reliable Solutions.', ar: 'أساسات قوية. حفر دقيق. حلول موثوقة.' },
      description: {
        en: 'DAZZ Tradlink International provides specialized piling and DTH drilling solutions to support construction, infrastructure, industrial, and foundation projects across Saudi Arabia.',
        ar: 'تقدم داز تريدلينك الدولية حلول متخصصة في أعمال الخوازيق والحفر بتقنية DTH لدعم مشاريع البناء والبنية التحتية والمشاريع الصناعية والأساسات عبر السعودية.'
      },
      ctaPrimary: { text: { en: 'Get a Drilling Quote', ar: 'احصل على عرض سعر الحفر' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Explore Services', ar: 'استكشف الخدمات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'FOUNDATION ENGINEERING', ar: 'هندسة الأساسات' },
      title: { en: 'High-Precision Drilling & Piling Solutions', ar: 'حلول الحفر والخوازيق عالية الدقة' },
      mainDescription: {
        en: 'DAZZ Tradlink International provides specialized piling and DTH drilling solutions to support construction, infrastructure, industrial, and foundation projects across Saudi Arabia.',
        ar: 'تقدم داز تريدلينك الدولية حلول متخصصة في أعمال الخوازيق والحفر بتقنية DTH لدعم مشاريع البناء والبنية التحتية والمشاريع الصناعية والأساسات عبر السعودية.'
      },
      paragraphs: [
        {
          en: 'Our services are focused on delivering reliable drilling solutions, efficient site operations, and foundation support tailored to project requirements.',
          ar: 'تركز خدماتنا على تقديم حلول حفر موثوقة، وعمليات موقع كفؤة، ودعم الأساسات المخصص لمتطلبات المشروع.'
        },
        {
          en: 'Down-The-Hole (DTH) drilling is an efficient solution for drilling through hard ground and rock formations, ideal for demanding infrastructure foundations.',
          ar: 'يعتبر الحفر بآلية DTH حلاً فعالاً للحفر عبر التربة الصلبة والتكوينات الصخرية، وهو مثالي لأساسات البنية التحتية المتطلبة.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Piling Works', ar: 'أعمال الخوازيق' }, description: { en: 'Comprehensive pile installation for structural foundation support.', ar: 'تركيب شامل للخوازيق لدعم أساسات الهياكل.' } },
      { order: 2, title: { en: 'DTH Drilling', ar: 'حفر بتقنية DTH' }, description: { en: 'High-impact Down-The-Hole drilling through hard rock and challenging strata.', ar: 'حفر عالي التأثير بتقنية DTH عبر الصخور الصلبة والطبقات التحدية.' } },
      { order: 3, title: { en: 'Foundation Drilling', ar: 'حفر الأساسات' }, description: { en: 'Precision borehole excavation for deep foundation systems.', ar: 'حفر آبار دقيق لأنظمة الأساسات العميقة.' } },
      { order: 4, title: { en: 'Rock Drilling', ar: 'حفر الصخور' }, description: { en: 'Specialized drilling through dense granite, basalt, and limestone.', ar: 'حفر متخصص عبر الجرانيت والبازلت والحجر الجيري الصفيح.' } },
      { order: 5, title: { en: 'Borehole Drilling', ar: 'حفر الفتحات والآبار' }, description: { en: 'Accurate borehole formation for anchoring and pile placement.', ar: 'تشكيل فتحات دقيقة لتثبيت المراسات ووضع الخوازيق.' } },
      { order: 6, title: { en: 'Site Preparation', ar: 'تجهيز الموقع' }, description: { en: 'Ground stabilization and rig positioning for safe operations.', ar: 'تثبيت التربة وتحديد موقع الحفارة لعمليات آمنة.' } },
      { order: 7, title: { en: 'Drilling Equipment Supply', ar: 'توريد معدات وآلات الحفر' }, description: { en: 'Rental and supply of heavy drilling rigs and accessories.', ar: 'تأجير وتوريد معدات الحفر الثقيلة والملحقات.' } },
      { order: 8, title: { en: 'Project-Based Drilling Solutions', ar: 'حلول حفر مخصصة للمشاريع' }, description: { en: 'Tailored engineering approaches matching site geological conditions.', ar: 'نهج هندسي مخصص يتوافق مع الظروف الجيولوجية للموقع.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Building Foundations', ar: 'أساسات المباني' }, description: { en: 'Deep foundation support for high-rise commercial and residential structures.', ar: 'دعم الأساسات العميقة للمباني التجارية والسكنية المرتفعة.' } },
      { order: 2, title: { en: 'Bridges & Abutments', ar: 'الجسور والأكتاف' }, description: { en: 'Heavy pile foundations for highway and railway bridge piers.', ar: 'أساسات خوازيق ثقيلة لركائز جسور الطرق السريعة والسكك الحديدية.' } },
      { order: 3, title: { en: 'Utility & Infrastructure Projects', ar: 'مشاريع المرافق والبنية التحتية' }, description: { en: 'Drilling for power line poles, water lines, and utility towers.', ar: 'الحفر لأعمدة خطوط الكهرباء وخطوط المياه وأبراج المرافق.' } },
      { order: 4, title: { en: 'Industrial Heavy Facilities', ar: 'المنشآت الصناعية الثقيلة' }, description: { en: 'Foundations for refineries, cement plants, and heavy manufacturing.', ar: 'أساسات للمصافي ومصانع الأسمنت والتصنيع الثقيل.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Site Survey & Geotechnical Review', ar: 'مسح الموقع والمراجعة الجيوتقنية' }, description: { en: 'Detailed evaluation of ground conditions and soil strata.', ar: 'تقييم تفصيلي لظروف الأرض وطبقات التربة.' } },
      { order: 2, stepNumber: 2, title: { en: 'Site Preparation & Rig Setup', ar: 'تجهيز الموقع وتركيب الحفارة' }, description: { en: 'Leveling site and positioning drilling rigs accurately.', ar: 'تسوية الموقع وتحديد موقع الحفارات بدقة.' } },
      { order: 3, stepNumber: 3, title: { en: 'Ground Drilling & Borehole Formation', ar: 'حفر التربة وتشكيل الفتحات' }, description: { en: 'Precision DTH drilling to required depth and diameter.', ar: 'حفر دقيق بتقنية DTH إلى العمق والقطر المطلوبين.' } },
      { order: 4, stepNumber: 4, title: { en: 'Pile Installation & Reinforcement', ar: 'تركيب الخوازيق والتسليح' }, description: { en: 'Placing steel reinforcement cage and pouring high-strength concrete.', ar: 'وضع قفص حديد التسليح وصب الخرسانة عالية القوة.' } },
      { order: 5, stepNumber: 5, title: { en: 'Quality & Site Inspection', ar: 'فحص الجودة والموقع' }, description: { en: 'Integrity testing and load verification before hand-over.', ar: 'اختبارات النزاهة والتحقق من الأحمال قبل التسليم.' } }
    ],
    equipment: [
      { order: 1, name: { en: 'DTH Drilling Rig', ar: 'حفارة DTH' }, description: { en: 'High-torque mobile drilling rig designed for hard rock.', ar: 'حفارة متحركة عالية العزم مصممة للصخور الصلبة.' }, specification: { en: 'Depths up to 50m+', ar: 'أعماق تصل إلى أكثر من 50 متر' } },
      { order: 2, name: { en: 'Air Compressor', ar: 'ضاغط هواء' }, description: { en: 'High-pressure compressor powering the pneumatic DTH hammer.', ar: 'ضاغط عالي الضغط يغذي مطرقة DTH الهوائية.' }, specification: { en: '21 - 35 Bar Pressure', ar: 'ضغط 21 - 35 بار' } },
      { order: 3, name: { en: 'Drill Rods & Bits', ar: 'أنابيب ورؤوس الحفر' }, description: { en: 'Tungsten carbide button bits for extreme wear resistance.', ar: 'رؤوس أزرار من كربيد التنجستن لمقاومة التآكل الشديد.' }, specification: { en: 'Various Diameters (4" - 24")', ar: 'أقطار مختلفة (4 - 24 بوصة)' } },
      { order: 4, name: { en: 'Piling Support Rig', ar: 'معدات دعم الخوازيق' }, description: { en: 'Cranes and concrete pumps for pile placement.', ar: 'رافعات ومضخات خرسانة لوضع الخوازيق.' }, specification: { en: 'Heavy-duty Capacity', ar: 'سعة شديدة التحمل' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Precision & Strength', ar: 'الدقة والقوة' }, description: { en: 'Accurate borehole alignment and deep foundation load capacities.', ar: 'محاذاة دقيقة للآبار وقدرات تحمّل عالية للأساسات العميقة.' } },
      { order: 2, title: { en: 'Advanced Drilling Technology', ar: 'تقنية حفر متقدمة' }, description: { en: 'State-of-the-art DTH hammers for rapid penetration in solid rock.', ar: 'مطرق DTH حديثة لاختراق سريع في الصخور الصلبة.' } },
      { order: 3, title: { en: 'Dependable Execution', ar: 'تنفيذ موثوق' }, description: { en: 'Experienced operators and strict site safety management.', ar: 'مشغلون ذوو خبرة وإدارة صارمة لسلامة الموقع.' } }
    ],
    cta: {
      title: { en: 'Build Strong Foundations with Reliable Drilling', ar: 'ابنِ أساسات قوية بحفر موثوق' },
      description: {
        en: 'Partner with DAZZ Tradlink for precise piling and rock drilling operations on your next foundation project.',
        ar: 'شاطر داز تريدلينك للحصول على عمليات خرسانة وحفر صخور دقيقة في مشروع الأساسات القادم.'
      },
      buttonText: { en: 'Consult Our Engineers', ar: 'استشر مهندسينا' },
      buttonUrl: '/contact'
    }
  },
  {
    name: {
      en: 'Construction Equipment Supply',
      ar: 'توريد معدات البناء'
    },
    slug: 'construction-equipment-supply',
    category: 'construction',
    shortDescription: {
      en: 'Reliable Equipment. Ready for Every Project.',
      ar: 'معدات موثوقة. جاهزة لكل مشروع.'
    },
    icon: '🚜',
    featured: true,
    displayOrder: 3,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'equipment', 'applications', 'process', 'whyChooseUs', 'cta'],
    sectionOrder: ['hero', 'introduction', 'equipment', 'applications', 'process', 'whyChooseUs', 'cta'],
    hero: {
      eyebrow: { en: 'HEAVY MACHINERY & FLEET', ar: 'الآلات الثقيلة والأسطول' },
      title: { en: 'Construction Equipment Supply', ar: 'توريد معدات البناء' },
      subtitle: { en: 'Reliable Equipment. Ready for Every Project.', ar: 'معدات موثوقة. جاهزة لكل مشروع.' },
      description: {
        en: 'DAZZ Tradlink International provides construction equipment solutions to support construction, infrastructure, industrial, and related projects across Saudi Arabia.',
        ar: 'تقدم داز تريدلينك الدولية حلول معدات البناء لدعم مشاريع البناء والبنية التحتية والمشاريع الصناعية عبر السعودية.'
      },
      ctaPrimary: { text: { en: 'Request Equipment', ar: 'طلب المعدات' }, url: '/contact' },
      ctaSecondary: { text: { en: 'View Machinery', ar: 'عرض الآلات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'MACHINERY SOLUTIONS', ar: 'حلول الآلات' },
      title: { en: 'Comprehensive Machinery Fleet Supply', ar: 'توريد أسطول شامل من الآلات والمعدات' },
      mainDescription: {
        en: 'DAZZ Tradlink International provides construction equipment solutions to support construction, infrastructure, industrial, and related projects across Saudi Arabia.',
        ar: 'تقدم داز تريدلينك الدولية حلول معدات البناء لدعم مشاريع البناء والبنية التحتية والمشاريع الصناعية عبر السعودية.'
      },
      paragraphs: [
        {
          en: 'We supply a wide range of construction equipment selected to meet diverse project requirements and operating environments.',
          ar: 'نوفر تشكيلة واسعة من معدات البناء المختارة لتلبية متطلبات المشاريع المختلفة وظروف التشغيل.'
        },
        {
          en: 'Our machinery solutions focus on reliability, performance, flexible supply options, and dedicated site support.',
          ar: 'تركز حلول الآلات لدينا على الموثوقية والأداء وخيارات التوريد المرنة والدعم المخصص للموقع.'
        }
      ]
    },
    equipment: [
      { order: 1, name: { en: 'Excavators', ar: 'الحفارات' }, description: { en: 'Crawler and wheeled excavators for earthmoving and trenching.', ar: 'حفارات جنزير وعجلات للأعمال الترابية والحفر.' }, specification: { en: '20T - 50T Operating Weight', ar: 'وزن تشغيلي 20 - 50 طن' } },
      { order: 2, name: { en: 'Wheel Loaders', ar: 'الجرافات العجلية (الشيول)' }, description: { en: 'Heavy-duty loaders for material handling and stockpile loading.', ar: 'جرافات ثقيلة لمناولة المواد وتحميل التشوينات.' }, specification: { en: 'Bucket capacities 3m³ - 6m³', ar: 'سعة القادوس 3 - 6 متر مكعب' } },
      { order: 3, name: { en: 'Bulldozers', ar: 'البلدوزرات' }, description: { en: 'Powerful dozers for land clearing, site leveling, and pushing.', ar: 'بلدوزرات قوية لتنظيف الأراضي وتسوية المواقع والدفع.' }, specification: { en: 'CAT D6 / D8 / D9 class', ar: 'فئات كاتربريلر D6 / D8 / D9' } },
      { order: 4, name: { en: 'Motor Graders', ar: 'ممهدات الطرق (الجريدر)' }, description: { en: 'Precision graders for road sub-base preparation and finish grading.', ar: 'ممهدات دقيقة لإعداد طبقات ما تحت الأساس والرصف النهائي.' }, specification: { en: '14ft Mouldboard', ar: 'شفرة بعرض 14 قدم' } },
      { order: 5, name: { en: 'Mobile & Tower Cranes', ar: 'الرافعات المتحركة والبرجية' }, description: { en: 'All-terrain hydraulic mobile cranes and heavy lifting cranes.', ar: 'رافعات هيدروليكية لجميع التضاريس ورافعات رفع ثقيل.' }, specification: { en: '50T to 300T Lifting Capacity', ar: 'قدرة رفع من 50 إلى 300 طن' } },
      { order: 6, name: { en: 'Compactors & Rollers', ar: 'المداحل والراصات' }, description: { en: 'Single drum soil compactors and tandem asphalt rollers.', ar: 'مداحل تربة أحادية الرول ومداحل أسفلت مزدوجة.' }, specification: { en: '10T - 25T Operating Weight', ar: 'وزن تشغيلي 10 - 25 طن' } },
      { order: 7, name: { en: 'Power Generators', ar: 'المولدات الكهربائية' }, description: { en: 'Diesel power generators for remote jobsite electrification.', ar: 'مولدات ديزل لتزويد مواقع العمل النائية بالكهرباء.' }, specification: { en: '50 kVA - 1250 kVA', ar: 'من 50 إلى 1250 كيلو فولت أمبير' } },
      { order: 8, name: { en: 'Concrete Machinery', ar: 'معدات الخرسانة' }, description: { en: 'Transit mixers, concrete pumps, and placer booms.', ar: 'خلاطات متحركة ومضخات خرسانة وأذرع توزيع.' }, specification: { en: 'Various Output Capacities', ar: 'سعات إنتاجية مختلفة' } }
    ],
    applications: [
      { order: 1, title: { en: 'Construction Projects', ar: 'مشاريع البناء' }, description: { en: 'Commercial, residential, and institutional building sites.', ar: 'مواقع المباني التجارية والسكنية والمؤسسية.' } },
      { order: 2, title: { en: 'Infrastructure & Utilities', ar: 'البنية التحتية والمرافق' }, description: { en: 'Water networks, sewerage, power plants, and telecom.', ar: 'شبكات المياه والصرف الصحي ومحطات الكهرباء والاتصالات.' } },
      { order: 3, title: { en: 'Road & Highway Works', ar: 'أعمال الطرق والأنفاق' }, description: { en: 'Excavation, grading, paving, and embankment construction.', ar: 'الحفر والتسوية والرصف وإنشاء الردوم.' } },
      { order: 4, title: { en: 'Earthworks & Site Prep', ar: 'الأعمال الترابية وتجهيز المواقع' }, description: { en: 'Bulk excavation, rock ripping, cut-and-fill operations.', ar: 'الحفر الضخم وتكسير الصخور وعمليات القطع والردم.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Equipment Selection', ar: 'اختيار المعدات' }, description: { en: 'Assessing jobsite specs to select optimal machine capacity.', ar: 'تقييم مواصفات موقع العمل لاختيار سعة الآلة المثالية.' } },
      { order: 2, stepNumber: 2, title: { en: 'Sourcing & Inspection', ar: 'التأمين والفحص' }, description: { en: 'Rigorous pre-delivery maintenance and mechanical verification.', ar: 'صيانة صارمة قبل التسليم والتحقق الميكانيكي.' } },
      { order: 3, stepNumber: 3, title: { en: 'Equipment Supply & Transport', ar: 'التوريد والنقل' }, description: { en: 'Flatbed low-bed mobilization directly to your project location.', ar: 'نقل ونقل الآلات عبر السطحات المنخفضة مباشرة لموقعك.' } },
      { order: 4, stepNumber: 4, title: { en: 'Project Support & Service', ar: 'دعم المشروع والصيانة' }, description: { en: 'On-site mechanic support and fast spare parts availability.', ar: 'دعم فني في الموقع وسرعة توفير قطع الغيار.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Reliable Equipment', ar: 'معدات موثوقة' }, description: { en: 'Well-maintained fleet from top global construction machinery brands.', ar: 'أسطول صيانة ممتازة من أفضل العلامات التجارية العالمية.' } },
      { order: 2, title: { en: 'Wide Equipment Range', ar: 'تشكيلة واسعة من المعدات' }, description: { en: 'Single source supply for earthmoving, lifting, and power needs.', ar: 'مصدر واحد لمعدات التكريك والرفع وتوليد الطاقة.' } },
      { order: 3, title: { en: 'Timely Delivery', ar: 'تسليم في الوقت المحدد' }, description: { en: 'Quick mobilization to keep your project schedule moving without delay.', ar: 'سرعة التحريك للحفاظ على جدول مشروعك دون تأخير.' } }
    ],
    cta: {
      title: { en: 'Equip Your Project for Success', ar: 'جهز مشروعك للنجاح' },
      description: {
        en: 'Get in touch with DAZZ Tradlink to source top-performance construction machinery for your jobsite.',
        ar: 'تواصل مع داز تريدلينك لتأمين آلات البناء عالية الأداء لموقع عملك.'
      },
      buttonText: { en: 'Inquire Equipment Fleet', ar: 'استفسر عن أسطول المعدات' },
      buttonUrl: '/contact'
    }
  },
  {
    name: {
      en: 'Construction Raw Materials Supply',
      ar: 'توريد المواد الخام للبناء'
    },
    slug: 'construction-raw-materials-supply',
    category: 'construction',
    shortDescription: {
      en: 'Strong Materials. Reliable Supply. Better Projects.',
      ar: 'مواد قوية. توريد موثوق. مشاريع أفضل.'
    },
    icon: '🪨',
    featured: true,
    displayOrder: 4,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'categories', 'applications', 'process', 'whyChooseUs', 'cta'],
    sectionOrder: ['hero', 'introduction', 'categories', 'applications', 'process', 'whyChooseUs', 'cta'],
    hero: {
      eyebrow: { en: 'ESSENTIAL BUILDING MATERIALS', ar: 'مواد البناء الأساسية' },
      title: { en: 'Construction Raw Materials Supply', ar: 'توريد المواد الخام للبناء' },
      subtitle: { en: 'Strong Materials. Reliable Supply. Better Projects.', ar: 'مواد قوية. توريد موثوق. مشاريع أفضل.' },
      description: {
        en: 'DAZZ Tradlink International provides reliable construction raw materials to meet diverse project requirements across construction, infrastructure, industrial, and related sectors.',
        ar: 'تقدم داز تريدلينك الدولية مواد خام للبناء موثوقة لتلبية متطلبات المشاريع المختلفة عبر قطاعات البناء والبنية التحتية والصناعة.'
      },
      ctaPrimary: { text: { en: 'Request Material Supply', ar: 'طلب توريد المواد' }, url: '/contact' },
      ctaSecondary: { text: { en: 'View Materials', ar: 'عرض المواد' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'MATERIAL SOURCING', ar: 'تأمين المواد' },
      title: { en: 'Quality Construction Raw Materials', ar: 'مواد بناء خام عالية الجودة' },
      mainDescription: {
        en: 'DAZZ Tradlink International provides reliable construction raw materials to meet diverse project requirements across construction, infrastructure, industrial, and related sectors.',
        ar: 'تقدم داز تريدلينك الدولية مواد خام للبناء موثوقة لتلبية متطلبات المشاريع المختلفة عبر قطاعات البناء والبنية التحتية والصناعة.'
      },
      paragraphs: [
        {
          en: 'We source and supply quality materials through dependable supply networks to support project continuity and performance.',
          ar: 'نقوم بتأمين وتوريد مواد عالية الجودة من خلال شبكات توريد موثوقة لدعم استمرارية المشروع وأدائه.'
        },
        {
          en: 'Our material supply logistics are engineered to handle high-volume deliveries directly to project sites across Saudi Arabia.',
          ar: 'تم تصميم لوجستيات توريد المواد لدينا للتعامل مع التسليمات ذات الأحجام الكبيرة مباشرة إلى مواقع المشاريع عبر السعودية.'
        }
      ]
    },
    categories: [
      { order: 1, title: { en: 'Cement', ar: 'الأسمنت' }, description: { en: 'OPC, SRC, and specialized bagged or bulk cement supplies.', ar: 'أسمنت بورتلاندي عادي، مقاوم للكبريتات، وتوريد أسمنت سائب أو بأكياس.' } },
      { order: 2, title: { en: 'Aggregates', ar: 'الركام والحصى' }, description: { en: 'Crushed limestone aggregates of various sieve sizes for concrete and sub-base.', ar: 'حصى وجريش الحجر الجيري بمقاسات غربالية مختلفة للخرسانة وطبقات الأساس.' } },
      { order: 3, title: { en: 'Washed Sand', ar: 'الرمل المغسول' }, description: { en: 'High-purity washed red and white sand for plastering and concrete mixing.', ar: 'رمل أحمر وأبيض مغسول عالي النقاء لأعمال اللياسة وخلط الخرسانة.' } },
      { order: 4, title: { en: 'Steel Reinforcement', ar: 'حديد التسليح' }, description: { en: 'High-yield deformed rebar bars, wire mesh, and structural steel sections.', ar: 'أسياخ حديد تسليح مشكّل عالي الإجهاد، شبك بقلاوة، ومقاطع صلب إنشائية.' } },
      { order: 5, title: { en: 'Concrete Blocks', ar: 'البلك الخرساني' }, description: { en: 'Hollow, solid, and insulated lightweight concrete blocks.', ar: 'بلك خرساني مفرغ، مسمت، وبلك معزول خفيف الوزن.' } },
      { order: 6, title: { en: 'Related Construction Materials', ar: 'مواد بناء ذات صلة' }, description: { en: 'Backfill materials, sub-base gravel, geotextiles, and binders.', ar: 'مواد الردم، حصى طبقات الأساس، الأقمشة الجيوتكستايل، والمواد الرابطة.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Building Construction', ar: 'بناء المباني' }, description: { en: 'Core structural materials for residential and commercial complexes.', ar: 'المواد الإنشائية الأساسية للمجمعات السكنية والتجارية.' } },
      { order: 2, title: { en: 'Infrastructure Works', ar: 'أعمال البنية التحتية' }, description: { en: 'High-volume aggregate and sand supply for highways, airports, and dams.', ar: 'توريد كميات كبيرة من الحصى والرمل للطرق السريعة والمطارات والسدود.' } },
      { order: 3, title: { en: 'Ready Mix Concrete Plants', ar: 'مصانع الخرسانة الجاهزة' }, description: { en: 'Continuous raw material supply partnerships for concrete batching.', ar: 'شراكات توريد مواد خام مستمرة لمصانع الخرسانة الجاهزة.' } },
      { order: 4, title: { en: 'Industrial Site Development', ar: 'تطوير المواقع الصناعية' }, description: { en: 'Sub-base and structural rebar for heavy foundation slabs.', ar: 'مواد طبقات ما تحت الأساس وحديد التسليح للبلاطات الخرسانية الثقيلة.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Material Sourcing', ar: 'تأمين المواد' }, description: { en: 'Partnering with certified quarries and steel mills.', ar: 'الشراكة مع الكسارات المعتمدة ومصانع الصلب.' } },
      { order: 2, stepNumber: 2, title: { en: 'Quality Verification', ar: 'التحقق من الجودة' }, description: { en: 'Sieve analysis, purity testing, and strength compliance checks.', ar: 'تحليل الغربال، اختبار النقاء، وفحوصات مطابقة القوة.' } },
      { order: 3, stepNumber: 3, title: { en: 'Supply Coordination', ar: 'تنسيق التوريد' }, description: { en: 'Scheduling tipper trucks and bulk carriers for continuous flow.', ar: 'جدولة شاحنات القلاب وناقلات السائب للتدفق المستمر.' } },
      { order: 4, stepNumber: 4, title: { en: 'Site Delivery & Support', ar: 'التسليم في الموقع والدعم' }, description: { en: 'Offloading at your jobsite with full delivery documentation.', ar: 'التفريغ في موقع عملك مع توثيق التوريد الكامل.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Quality Materials', ar: 'مواد عالية الجودة' }, description: { en: 'All raw materials meet SASO and Saudi Ministry standards.', ar: 'جميع المواد الخام تطابق مواصفات الهيئة السعودية للمواصفات SASO.' } },
      { order: 2, title: { en: 'Reliable Fleet Logistics', ar: 'لوجستيات أسطول موثوقة' }, description: { en: 'Large fleet of tippers and trailers for high daily delivery volumes.', ar: 'أسطول ضخم من القلابات والتريلات لتوريد كميات يومية كبيرة.' } },
      { order: 3, title: { en: 'Competitive Pricing', ar: 'أسعار تنافسية' }, description: { en: 'Direct sourcing guarantees optimal cost efficiency for bulk orders.', ar: 'التأمين المباشر يضمن أفضل كفاءة تكلفة للطلبات الكبيرة.' } }
    ],
    cta: {
      title: { en: 'Building Stronger Projects with Stronger Materials', ar: 'بناء مشاريع أقوى بمواد أقوى' },
      description: {
        en: 'We provide dependable construction materials to support quality, continuity and successful project delivery.',
        ar: 'نقدم مواد بناء موثوقة لدعم الجودة والاستمرارية ونجاح تسليم المشاريع.'
      },
      buttonText: { en: 'Order Materials Now', ar: 'اطلب المواد الآن' },
      buttonUrl: '/contact'
    }
  },
  {
    name: {
      en: 'Cement Trading',
      ar: 'تجارة الأسمنت'
    },
    slug: 'cement-trading',
    category: 'construction',
    shortDescription: {
      en: 'The Right Cement. The Right Supply. The Right Partner.',
      ar: 'الأسمنت المناسب. التوريد المناسب. الشريك المناسب.'
    },
    icon: '🏭',
    featured: false,
    displayOrder: 5,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'applications', 'whyChooseUs', 'cta'],
    hero: {
      eyebrow: { en: 'BULK CEMENT TRADING & LOGISTICS', ar: 'تجارة ولوجستيات الأسمنت السائب' },
      title: { en: 'Cement Trading', ar: 'تجارة الأسمنت' },
      subtitle: { en: 'The Right Cement. The Right Supply. The Right Partner.', ar: 'الأسمنت المناسب. التوريد المناسب. الشريك المناسب.' },
      description: {
        en: 'DAZZ Tradlink International provides cement trading and supply solutions through trusted manufacturers and reliable supply networks.',
        ar: 'تقدم داز تريدلينك الدولية حلول تجارة وتوريد الأسمنت من خلال مصنعين موثوقين وشبكات توريد عالية الاعتمادية.'
      },
      ctaPrimary: { text: { en: 'Inquire Cement Trade', ar: 'استفسر عن تجارة الأسمنت' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Learn More', ar: 'اعرف المزيد' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'CEMENT TRADING & DISTRIBUTION', ar: 'تجارة وتوزيع الأسمنت' },
      title: { en: 'Strategic Cement Sourcing & Supply', ar: 'تأمين وتوريد استراتيجي للأسمنت' },
      mainDescription: {
        en: 'DAZZ Tradlink International provides cement trading and supply solutions through trusted manufacturers and reliable supply networks.',
        ar: 'تقدم داز تريدلينك الدولية حلول تجارة وتوريد الأسمنت من خلال مصنعين موثوقين وشبكات توريد عالية الاعتمادية.'
      },
      paragraphs: [
        {
          en: 'Our cement solutions are designed to support construction, infrastructure, industrial projects, and ready mix concrete operations.',
          ar: 'تم تصميم حلول الأسمنت لدينا لدعم مشاريع البناء والبنية التحتية والمشاريع الصناعية وعمليات الخرسانة الجاهزة.'
        },
        {
          en: 'We maintain strong partnerships with leading regional cement producers to secure stable pricing and continuous volume availability.',
          ar: 'نحافظ على شراكات قوية مع كبار منتجي الأسمنت الإقليميين لضمان أسعار مستقرة وتوفر مستمر للكميات.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Cement Sourcing', ar: 'تأمين الأسمنت' }, description: { en: 'Direct sourcing of Ordinary Portland Cement (OPC) and Sulphate Resistant Cement (SRC).', ar: 'تأمين مباشر للأسمنت البورتلاندي العادي والأسمنت المقاوم للكبريتات.' } },
      { order: 2, title: { en: 'Bulk Cement Supply', ar: 'توريد الأسمنت السائب' }, description: { en: 'Bulker tanker transport directly to batching plants and construction sites.', ar: 'نقل بصهاريج السائب (السيلاس) مباشرة إلى مصانع الخلط ومواقع البناء.' } },
      { order: 3, title: { en: 'Bagged Cement Trading', ar: 'تجارة الأسمنت المعبأ' }, description: { en: 'Palletized 50kg cement bag delivery for general building needs.', ar: 'توصيل أكياس أسمنت 50 كجم على طبالي لاحتياجات البناء العامة.' } },
      { order: 4, title: { en: 'Project-Based Cement Supply', ar: 'توريد الأسمنت للمشاريع' }, description: { en: 'Long-term volume contracts matching mega project construction schedules.', ar: 'عقود كميات طويلة الأجل تتوافق مع جداول تنفيذ المشاريع الكبرى.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Ready Mix Plants', ar: 'مصانع الخرسانة الجاهزة' }, description: { en: 'Consistent bulk cement tanker deliveries for daily batching.', ar: 'توصيل شاحنات أسمنت سائب مستمر لعمليات الخلط اليومية.' } },
      { order: 2, title: { en: 'Infrastructure Projects', ar: 'مشاريع البنية التحتية' }, description: { en: 'High volumes of SRC cement for marine, soil, and underground structures.', ar: 'كميات كبيرة من أسمنت SRC للهياكل البحرية والتربة وتحت الأرض.' } },
      { order: 3, title: { en: 'Precast & Concrete Product Factories', ar: 'مصانع الخرسانة مسبقة الصنع' }, description: { en: 'High early strength cement types for fast mold turnaround.', ar: 'أنواع أسمنت ذات قوة مبكرة عالية لسرعة دوران القوالب.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Reliable Sourcing', ar: 'تأمين موثوق' }, description: { en: 'Direct allocation from Saudi Arabia\'s leading cement factories.', ar: 'تخصيص مباشر من مصانع الأسمنت الرائدة في المملكة العربية السعودية.' } },
      { order: 2, title: { en: 'Consistent Availability', ar: 'توفر مستمر' }, description: { en: 'Never worry about site cement shortages during peak demand.', ar: 'لا تقلق بشأن نقص الأسمنت في الموقع خلال مواسم الذروة.' } },
      { order: 3, title: { en: 'Competitive Pricing', ar: 'أسعار تنافسية' }, description: { en: 'Volume trading power enables cost savings for our clients.', ar: 'قوة التجارة بالكميات تتيح توفير التكاليف لعملائنا.' } }
    ],
    cta: {
      title: { en: 'Strong Materials. Stronger Projects.', ar: 'مواد قوية. مشاريع أقوى.' },
      description: {
        en: 'We provide reliable cement sourcing and supply solutions to support the success of construction and infrastructure projects.',
        ar: 'نقدم حلول تأمين وتوريد أسمنت موثوقة لدعم نجاح مشاريع البناء والبنية التحتية.'
      },
      buttonText: { en: 'Request Cement Quote', ar: 'طلب عرض سعر الأسمنت' },
      buttonUrl: '/contact'
    }
  },
  {
    name: {
      en: 'DTH Piling Machine Supply',
      ar: 'توريد آلات الخوازيق بتقنية DTH'
    },
    slug: 'dth-piling-machine-supply',
    category: 'construction',
    shortDescription: {
      en: 'Engineered for Performance. Ready for Every Challenge.',
      ar: 'مصممة للأداء العالي. جاهزة لكل التحديات.'
    },
    icon: '🛠️',
    featured: false,
    displayOrder: 6,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'equipment', 'applications', 'whyChooseUs', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'equipment', 'applications', 'whyChooseUs', 'cta'],
    hero: {
      eyebrow: { en: 'SPECIALIZED RIG SUPPLY', ar: 'توريد حفارات متخصصة' },
      title: { en: 'DTH Piling Machine Supply', ar: 'توريد آلات الخوازيق بتقنية DTH' },
      subtitle: { en: 'Engineered for Performance. Ready for Every Challenge.', ar: 'مصممة للأداء العالي. جاهزة لكل التحديات.' },
      description: {
        en: 'DAZZ Tradlink International supplies DTH piling machines and related equipment designed to support demanding foundation, construction and infrastructure requirements.',
        ar: 'تورد داز تريدلينك الدولية آلات الخوازيق DTH والمعدات ذات الصلة المصممة لدعم متطلبات الأساسات والبناء والبنية التحتية الشاقة.'
      },
      ctaPrimary: { text: { en: 'Inquire Machine Supply', ar: 'استفسر عن توريد الآلات' }, url: '/contact' },
      ctaSecondary: { text: { en: 'View Specifications', ar: 'عرض المواصفات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'DRILLING MACHINERY', ar: 'آلات الحفر' },
      title: { en: 'Heavy DTH Drilling & Piling Equipment', ar: 'معدات حفر وخوازيق DTH ثقيلة' },
      mainDescription: {
        en: 'DAZZ Tradlink International supplies DTH piling machines and related equipment designed to support demanding foundation, construction and infrastructure requirements.',
        ar: 'تورد داز تريدلينك الدولية آلات الخوازيق DTH والمعدات ذات الصلة المصممة لدعم متطلبات الأساسات والبناء والبنية التحتية الشاقة.'
      },
      paragraphs: [
        {
          en: 'Our equipment solutions focus on performance, reliability, mobility and efficient operation across different project environments.',
          ar: 'تركز حلول المعدات لدينا على الأداء والموثوقية وحرية الحركة والتشغيل الكفء عبر بيئات المشاريع المختلفة.'
        },
        {
          en: 'We supply high-efficiency crawler DTH rigs built to operate in hard granite, limestone, and dense rocky ground conditions.',
          ar: 'نوفر حفارات DTH جنزير عالية الكفاءة مخصصة للعمل في الجرانيت الصلب والحجر الجيري والتربة الصخرية الكثيفة.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'DTH Piling Rigs', ar: 'حفارات خوازيق DTH' }, description: { en: 'Crawler-mounted DTH drilling machines with high-impact percussion.', ar: 'آلات حفر DTH مجنزرة مع نظام طرق عالي التأثير.' } },
      { order: 2, title: { en: 'Site Mobility & Versatility', ar: 'مرونة الحركة والتطبيقات' }, description: { en: 'Compact and mobile design suitable for steep terrains and tight jobsites.', ar: 'تصميم مدمج ومتحرك مناسب للتضاريس الوعرة والمواقع الضيقة.' } },
      { order: 3, title: { en: 'Foundation Drilling Capability', ar: 'قدرة حفر الأساسات' }, description: { en: 'Capable of drilling large diameter holes into hard rock for pile insertion.', ar: 'قادرة على حفر فتحات ذات أقطار كبيرة في الصخور الصلبة لإدخال الخوازيق.' } },
      { order: 4, title: { en: 'Technical & Site Support', ar: 'الدعم الفني والموقعي' }, description: { en: 'Full operator training, site commissioning, and maintenance packages.', ar: 'تدريب كامل للمشغلين، تشغيل بالموقع، وباقات صيانة.' } }
    ],
    equipment: [
      { order: 1, name: { en: 'DTH Drill Mast Assembly', ar: 'مجموعة ساري حفر DTH' }, description: { en: 'Heavy hydraulic mast with high pullback force.', ar: 'ساري هيدروليكي ثقيل بقوة سحب عالية.' }, specification: { en: 'Pullback capacity 15T - 30T', ar: 'سعة السحب 15 - 30 طن' } },
      { order: 2, name: { en: 'High-Pressure DTH Hammer', ar: 'مطرقة DTH عالية الضغط' }, description: { en: 'Pneumatic percussion hammer engineered for high penetration rate.', ar: 'مطرقة طرق هوائية مصممة لمعدل اختراق عالي.' }, specification: { en: '6" - 12" Hammer Series', ar: 'سلسلة مطارق 6 - 12 بوصة' } },
      { order: 3, name: { en: 'High-Torque Rotary Head', ar: 'رأس تدوير عالي العزم' }, description: { en: 'Smooth rotation drive for hard rock borehole completion.', ar: 'محرك تدوير سلس لإكمال حفر الآبار في الصخور الصلبة.' }, specification: { en: 'Torque up to 12,000 Nm', ar: 'عزم يصل إلى 12,000 نيوتن متر' } },
      { order: 4, name: { en: 'Support Compressor Units', ar: 'وحدات ضواغط الدعم' }, description: { en: 'Portable diesel air compressors for continuous pneumatic hammer driving.', ar: 'ضواغط هواء ديزل محمولة لتشغيل المطرقة الهوائية المستمر.' }, specification: { en: '1000 - 1350 CFM at 25 Bar', ar: '1000 - 1350 قدم مكعب/دقيقة عند 25 بار' } }
    ],
    applications: [
      { order: 1, title: { en: 'Foundation Piling', ar: 'خوازيق الأساسات' }, description: { en: 'Drilling rock sockets for structural bridge and building piles.', ar: 'حفر التجويفات الصخرية لخوازيق الجسور والمباني الإنشائية.' } },
      { order: 2, title: { en: 'Anchor & Micropiling', ar: 'المرسات والخوازيق الدقيقة' }, description: { en: 'Tie-back anchor drilling for retaining walls and slope stabilization.', ar: 'حفر مرسات التثبيت للجدران الاستنادية وتثبيت المنحدرات.' } },
      { order: 3, title: { en: 'Quarrying & Mining Ops', ar: 'عمليات المحاجر والتعدين' }, description: { en: 'Blast hole drilling in stone quarries and open-pit mines.', ar: 'حفر فتحات التفجير في محاجر الأحجار والمناجم المكشوفة.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'High Drilling Performance', ar: 'أداء حفر عالي' }, description: { en: 'Superior penetration rate reduces drilling time per borehole.', ar: 'معدل اختراق متفوق يقلل وقت الحفر لكل بئر.' } },
      { order: 2, title: { en: 'Durability & Reliability', ar: 'المتانة والموثوقية' }, description: { en: 'Heavy-duty steel construction withstands harsh desert environments.', ar: 'هيكل صلب شديد التحمل يتحمل ظروف البيئة الصحراوية القاسية.' } },
      { order: 3, title: { en: 'Maintenance & Parts Support', ar: 'دعم الصيانة والقطع' }, description: { en: 'Complete inventory of drill rods, bits, and replacement seals.', ar: 'مخزون كامل من أنابيب ورؤوس الحفر وأختام الاستبدال.' } }
    ],
    cta: {
      title: { en: 'The Right Machine for the Right Foundation', ar: 'الآلة المناسبة للأساس المناسب' },
      description: {
        en: 'Reliable DTH piling equipment designed to support demanding foundation and drilling requirements.',
        ar: 'معدات خوازيق DTH موثوقة مصممة لدعم متطلبات الأساسات والحفر الشاقة.'
      },
      buttonText: { en: 'Request Rig Specifications', ar: 'طلب مواصفات الحفارة' },
      buttonUrl: '/contact'
    }
  },
  {
    name: {
      en: 'Waste Management Services',
      ar: 'خدمات إدارة النفايات'
    },
    slug: 'waste-management-services',
    category: 'logistics',
    shortDescription: {
      en: 'Cleaner Worksites. A Better Future.',
      ar: 'موقع عمل أنظف. مستقبل أفضل.'
    },
    icon: '♻️',
    featured: false,
    displayOrder: 7,
    status: 'published',
    enabledSections: ['hero', 'introduction', 'capabilities', 'process', 'applications', 'whyChooseUs', 'cta'],
    sectionOrder: ['hero', 'introduction', 'capabilities', 'process', 'applications', 'whyChooseUs', 'cta'],
    hero: {
      eyebrow: { en: 'ENVIRONMENTAL & WORKSITE SERVICES', ar: 'الخدمات البيئية ومواقع العمل' },
      title: { en: 'Waste Management Services', ar: 'خدمات إدارة النفايات' },
      subtitle: { en: 'Cleaner Worksites. A Better Future.', ar: 'موقع عمل أنظف. مستقبل أفضل.' },
      description: {
        en: 'DAZZ Tradlink International provides efficient and responsible waste management solutions designed to support cleaner worksites, safer operations and responsible environmental practices.',
        ar: 'تقدم داز تريدلينك الدولية حلول إدارة نفايات كفؤة ومسؤولة مصممة لدعم مواقع عمل أنظف وعمليات أكثر أماناً وممارسات بيئية مسؤولة.'
      },
      ctaPrimary: { text: { en: 'Contact Waste Services', ar: 'تواصل مع خدمات النفايات' }, url: '/contact' },
      ctaSecondary: { text: { en: 'Learn Options', ar: 'تعرف على الخيارات' }, url: '/services' }
    },
    introduction: {
      sectionLabel: { en: 'ENVIRONMENTAL SOLUTIONS', ar: 'الحلول البيئية' },
      title: { en: 'Responsible Worksite Waste Solutions', ar: 'حلول نفايات مواقع العمل المسؤولة' },
      mainDescription: {
        en: 'DAZZ Tradlink International provides efficient and responsible waste management solutions designed to support cleaner worksites, safer operations and responsible environmental practices.',
        ar: 'تقدم داز تريدلينك الدولية حلول إدارة نفايات كفؤة ومسؤولة مصممة لدعم مواقع عمل أنظف وعمليات أكثر أماناً وممارسات بيئية مسؤولة.'
      },
      paragraphs: [
        {
          en: 'Our services cover waste collection, transportation, sorting, handling, disposal and project-specific waste solutions.',
          ar: 'تغطي خدماتنا جمع النفايات والنقل والفرز والتعامل والتخلص والحلول الخاصة بالمشاريع.'
        },
        {
          en: 'We strictly comply with Saudi environmental regulations (GAMEP) to ensure fully documented, sustainable waste handling.',
          ar: 'نلتزم بشكل صارم بالأنظمة البيئية السعودية (المركز الوطني للرقابة على الالتزام البيئي) لضمان التعامل الموثق والمستدام مع النفايات.'
        }
      ]
    },
    capabilities: [
      { order: 1, title: { en: 'Waste Collection', ar: 'جمع النفايات' }, description: { en: 'Scheduled skip bin placement and jobsite debris collection.', ar: 'وضع الحاويات المجدول وجمع حطام وأنقاض مواقع العمل.' } },
      { order: 2, title: { en: 'Waste Transportation', ar: 'نقل النفايات' }, description: { en: 'Fleet of hook-loaders and skip trucks for prompt waste clearance.', ar: 'أسول من شاحنات الهوك-لودر والقلابات لإزالة النفايات السريعة.' } },
      { order: 3, title: { en: 'Construction Waste Management', ar: 'إدارة نفايات البناء' }, description: { en: 'Handling concrete rubble, rebar scrap, timber, and excavation spoil.', ar: 'التعامل مع أنقاض الخرسانة، خردة حديد التسليح، الأخشاب، ومخلفات الحفر.' } },
      { order: 4, title: { en: 'Industrial Waste Solutions', ar: 'حلول النفايات الصناعية' }, description: { en: 'Handling non-hazardous industrial processing waste and packaging.', ar: 'التعامل مع نفايات المعالجة الصناعية غير الخطرة ومواد التغليف.' } },
      { order: 5, title: { en: 'Waste Sorting & Removal', ar: 'فرز وإزالة النفايات' }, description: { en: 'Segregating recyclable materials from general landfill waste.', ar: 'فصل المواد القابلة لإعادة التدوير عن النفايات العامة.' } }
    ],
    process: [
      { order: 1, stepNumber: 1, title: { en: 'Collection & On-site Bins', ar: 'الجمع والحاويات في الموقع' }, description: { en: 'Deploying heavy-duty skips and roll-off containers to your site.', ar: 'نشر حاويات شديدة التحمل وحاويات قابلة للسحب بموقعك.' } },
      { order: 2, stepNumber: 2, title: { en: 'Transportation', ar: 'النقل' }, description: { en: 'Hauling loaded containers safely using authorized transport trucks.', ar: 'سحب الحاويات المحملة بآمان باستخدام شاحنات نقل مصرحة.' } },
      { order: 3, stepNumber: 3, title: { en: 'Sorting & Handling', ar: 'الفرز والتعامل' }, description: { en: 'Sorting scrap metal, timber, concrete, and plastics for recycling.', ar: 'فرز خردة المعادن والأخشاب والخرسانة والبلاستيك لإعادة التدوير.' } },
      { order: 4, stepNumber: 4, title: { en: 'Responsible Disposal', ar: 'التخلص المسؤول' }, description: { en: 'Final dumping at designated municipal authorized landfills.', ar: 'التفريغ النهائي في المرامي المعتمدة من البلدية.' } }
    ],
    applications: [
      { order: 1, title: { en: 'Construction Sites', ar: 'مواقع البناء' }, description: { en: 'Demolition rubble, masonry scrap, and site cleanup.', ar: 'أنقاض الهدم، خردة البلوك، وتنظيف المواقع.' } },
      { order: 2, title: { en: 'Industrial Plants', ar: 'المصانع الصناعية' }, description: { en: 'Continuous plant waste removal contracts.', ar: 'عقود مستمرة لإزالة نفايات المصانع.' } },
      { order: 3, title: { en: 'Infrastructure Developments', ar: 'مشاريع البنية التحتية' }, description: { en: 'Large-scale spoil disposal and ROW clearing.', ar: 'التخلص من مخلفات الحفر الكبيرة وتنظيف مسارات الطرق.' } }
    ],
    whyChooseUs: [
      { order: 1, title: { en: 'Safe & Clean Handling', ar: 'تعامل آمن ونظيف' }, description: { en: 'Prevents jobsite safety hazards and maintains immaculate project sites.', ar: 'يمنع مخاطر السلامة في الموقع ويحافظ على مواقع مشاريع نظيفة.' } },
      { order: 2, title: { en: 'Environmental Compliance', ar: 'الالتزام البيئي' }, description: { en: 'Full manifest reporting compliant with Saudi municipal laws.', ar: 'بيانات مانفيست كاملة متوافقة مع القوانين البلدية السعودية.' } },
      { order: 3, title: { en: 'Reliable Fleet Logistics', ar: 'لوجستيات أسطول موثوقة' }, description: { en: 'Never suffer from overflowing bins or delayed site pickups.', ar: 'لن تعاني أبداً من امتلاء الحاويات أو تأخر الرفع من الموقع.' } }
    ],
    cta: {
      title: { en: 'Cleaner Sites. Safer Operations. Responsible Futures.', ar: 'مواقع أنظف. عمليات آمنة. مستقبل مسؤول.' },
      description: {
        en: 'We deliver responsible waste management solutions that help organizations maintain cleaner sites and support sustainable project success.',
        ar: 'نقدم حلول إدارة نفايات مسؤولة تساعد المؤسسات على الحفاظ على مواقع أنظف ودعم نجاح المشاريع المستدامة.'
      },
      buttonText: { en: 'Setup Waste Management', ar: 'إعداد إدارة النفايات' },
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

    const serviceFields = TRANSLATABLE_FIELDS.Service;

    for (const serviceData of servicesData) {
      console.log(`Processing service: "${serviceData.name.en}" (${serviceData.slug})...`);

      const existingDoc = await Service.findOne({ slug: serviceData.slug });
      const existingMeta = (existingDoc as SafeAny)?.translationMeta || {};

      const payload = {
        ...serviceData,
        status: 'published',
        translationStatus: { ar: 'completed' }
      };

      const result = await Service.findOneAndUpdate(
        { slug: serviceData.slug },
        payload,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`  ✓ Successfully seeded/updated: "${result.name.en}" (Translation status: completed)`);
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
