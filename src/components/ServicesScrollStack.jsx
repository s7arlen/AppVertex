import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './ScrollStack.css';

const servicesData = [
  {
    num: '01 // DOSSIER',
    badge: 'Web Engineering',
    status: 'ACTIVE PIPELINE',
    title: 'Website Development',
    desc: 'High-performance websites built to convert visitors into loyal customers. We craft clean, accessible, semantic web architectures with blistering page loads and Core Web Vitals optimization.',
    metrics: [
      { label: 'Lighthouse', val: '98+ Target' },
      { label: 'Viewport', val: 'Mobile → 4K' },
      { label: 'Turnaround', val: '1–3 Weeks' }
    ],
    deliverables: [
      'Custom Responsive Architecture',
      'Headless CMS Integration',
      'Technical SEO & Speed Tuning'
    ]
  },
  {
    num: '02 // DOSSIER',
    badge: 'Custom Software',
    status: 'ACTIVE PIPELINE',
    title: 'Custom Web Applications',
    desc: 'Scalable full-stack SaaS platforms, portals, and internal tools built to automate daily operations, eliminate bottlenecks, and scale gracefully with your user base.',
    metrics: [
      { label: 'Uptime SLA', val: '99.9% Target' },
      { label: 'API Protocols', val: 'REST & GraphQL' },
      { label: 'Security', val: 'Role-Based Auth' }
    ],
    deliverables: [
      'Bespoke Database Architecture',
      'Multi-Tenant SaaS Systems',
      'Real-Time Administrative Dashboards'
    ]
  },
  {
    num: '03 // DOSSIER',
    badge: 'Product Design',
    status: 'DESIGN SPRINT',
    title: 'UI/UX Design',
    desc: 'Intuitive digital experiences grounded in user psychology and visual hierarchy. We transform complex workflows into frictionless, elegant user journeys.',
    metrics: [
      { label: 'Design System', val: 'Figma Tokens' },
      { label: 'Accessibility', val: 'WCAG 2.1 AA' },
      { label: 'Prototyping', val: 'High-Fidelity' }
    ],
    deliverables: [
      'Wireframing & Information Architecture',
      'Production Component Libraries',
      'User Testing & Motion Micro-Interactions'
    ]
  },
  {
    num: '04 // DOSSIER',
    badge: 'Brand Systems',
    status: 'CREATIVE LAB',
    title: 'Branding & Digital Identity',
    desc: 'Distinctive visual identities that command authority in crowded markets. We build cohesive brand languages that resonate across all digital touchpoints.',
    metrics: [
      { label: 'Deliverables', val: 'Vector Suites' },
      { label: 'Documentation', val: 'Brand Guidelines' },
      { label: 'Consistency', val: 'Cross-Platform' }
    ],
    deliverables: [
      'Logo Suite & Bespoke Iconography',
      'Color Palette & Typography System',
      'Social & Digital Marketing Collateral'
    ]
  },
  {
    num: '05 // DOSSIER',
    badge: 'EdTech Systems',
    status: 'DEPLOYED SUITE',
    title: 'School Management Portals',
    desc: 'Integrated institutional portals that streamline student admissions, fee collections, attendance tracking, and parent communication into one unified hub.',
    metrics: [
      { label: 'Administrative', val: 'Zero-Paper' },
      { label: 'Portals', val: 'Parent & Student' },
      { label: 'Gateways', val: 'Secure Payments' }
    ],
    deliverables: [
      'Student Information Systems (SIS)',
      'Digital Gradebooks & Attendance',
      'Automated SMS & Notification Feeds'
    ]
  },
  {
    num: '06 // DOSSIER',
    badge: 'Online Commerce',
    status: 'ACTIVE PIPELINE',
    title: 'E-commerce Development',
    desc: 'High-conversion digital storefronts engineered for fast browsing, effortless checkout, and seamless inventory management across web and mobile.',
    metrics: [
      { label: 'Checkout', val: 'Sub-Second' },
      { label: 'Gateways', val: 'Stripe & UPI' },
      { label: 'Catalog Sync', val: 'Automated' }
    ],
    deliverables: [
      'Shopify & Custom Storefronts',
      'Custom Checkout & Abandonment Recovery',
      'Inventory & ERP Integrations'
    ]
  },
  {
    num: '07 // DOSSIER',
    badge: 'Search Performance',
    status: 'GROWTH ENGINE',
    title: 'SEO & Digital Growth',
    desc: 'Data-driven search engine optimization, structured schema markup, and performance tuning that elevate your brand to the top of search rankings.',
    metrics: [
      { label: 'Markup', val: 'JSON-LD Schema' },
      { label: 'Vitals', val: 'Core Vitals Pass' },
      { label: 'Strategy', val: 'Keyword Dominance' }
    ],
    deliverables: [
      'Technical SEO Audits & Remediation',
      'On-Page Semantic Optimization',
      'Analytics & Conversion Funnel Setup'
    ]
  },
  {
    num: '08 // DOSSIER',
    badge: 'SLA Support',
    status: '24/7 ACTIVE',
    title: 'Website Maintenance',
    desc: 'Proactive security patching, daily cloud backups, 24/7 uptime monitoring, and priority technical support to keep your mission-critical systems running flawlessly.',
    metrics: [
      { label: 'Monitoring', val: '24/7 Realtime' },
      { label: 'Backups', val: 'Daily Cloud Sync' },
      { label: 'Response', val: '< 2h Urgent SLA' }
    ],
    deliverables: [
      'Framework, CMS & Security Updates',
      'Malware & Vulnerability Protection',
      'Continuous Speed & Asset Optimization'
    ]
  }
];

export const ServicesScrollStack = () => {
  return (
    <div className="services-scroll-stack-wrapper">
      <ScrollStack
        useWindowScroll={true}
        stackPosition="120px"
        itemStackDistance={24}
        itemDistance={100}
        itemScale={0.04}
        baseScale={0.84}
        dimAmount={0.18}
        tiltAmount={3}
        rotationAmount={1}
        holdDistance={220}
      >
        {servicesData.map((svc, i) => (
          <ScrollStackItem key={i} itemClassName="service-stack-card">
            <div className="service-stack-card__header">
              <div className="service-stack-meta">
                <span className="service-stack-num">{svc.num}</span>
                <span className="service-stack-badge">{svc.badge}</span>
              </div>
              <div className="service-stack-status">
                <span className="status-pulse-dot" />
                <span>{svc.status}</span>
              </div>
            </div>

            <div className="service-stack-card__body">
              <div className="service-stack-main">
                <h3 className="service-stack-title">{svc.title}</h3>
                <p className="service-stack-desc">{svc.desc}</p>
                <div className="service-stack-actions">
                  <a href="#contact" className="btn btn-primary btn-sm">
                    Initiate Project <span className="arr">→</span>
                  </a>
                  <a href="services.html" className="btn btn-secondary btn-sm">
                    Full Specs
                  </a>
                </div>
              </div>

              <div className="service-stack-specs">
                <div className="service-stack-metrics">
                  {svc.metrics.map((m, mi) => (
                    <div key={mi} className="metric-chip">
                      <span className="metric-label">{m.label}</span>
                      <span className="metric-val">{m.val}</span>
                    </div>
                  ))}
                </div>
                <ul className="service-stack-deliverables">
                  {svc.deliverables.map((d, di) => (
                    <li key={di}>
                      <span className="bullet-check">✓</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
};

export default ServicesScrollStack;
