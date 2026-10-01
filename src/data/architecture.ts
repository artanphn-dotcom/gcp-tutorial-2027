export interface ConfigurationGuide {
  id: string
  title: string
  focus: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  summary: string
  checks: string[]
}

export interface ArchitecturePattern {
  id: string
  title: string
  category: string
  summary: string
  components: string[]
  bestPractices: string[]
}

export const configurationGuides: ConfigurationGuide[] = [
  {
    id: 'private-vm-egress',
    title: 'Private VM egress baseline',
    focus: 'Private access',
    level: 'Intermediate',
    summary: 'Private workloads need explicit egress design so they can reach the internet, partner services, or on-prem destinations without public IPs.',
    checks: ['Cloud NAT attached', 'Correct subnet range', 'Firewall egress expected', 'Flow Logs enabled'],
  },
  {
    id: 'hybrid-connectivity',
    title: 'Hybrid connectivity validation',
    focus: 'Hybrid',
    level: 'Intermediate',
    summary: 'Hybrid networking is usually stable only when route advertisements, tunnel state, and BGP peers are all validated together.',
    checks: ['Tunnel status healthy', 'BGP session established', 'Router ASN matches', 'Static route fallback checked'],
  },
  {
    id: 'load-balancer-hardening',
    title: 'Load balancer hardening',
    focus: 'Load Balancing',
    level: 'Advanced',
    summary: 'Healthy load balancing requires backend health checks, identity-aware firewall rules, and well-defined forwarding behavior.',
    checks: ['Health checks pass', 'Backend service policy matches', 'Firewall allows health probes', 'Regional failover reviewed'],
  },
  {
    id: 'dns-and-private-resolution',
    title: 'DNS and private resolution',
    focus: 'DNS',
    level: 'Beginner',
    summary: 'Private DNS and split-horizon design reduce surprises when internal workloads need access to private endpoints and external services.',
    checks: ['Managed zone exists', 'Record set is correct', 'Resolver is reachable', 'Split-horizon policy documented'],
  },
]

export const architecturePatterns: ArchitecturePattern[] = [
  {
    id: 'hub-spoke',
    title: 'Hub-and-spoke network design',
    category: 'VPC',
    summary: 'Use a shared hub network for ingress, egress, and shared services while keeping application workloads isolated in spoke VPCs.',
    components: ['Transit VPC or Shared VPC', 'Cloud Router', 'Cloud VPN or Interconnect', 'Firewall policy layers'],
    bestPractices: ['Keep shared services centralized', 'Use explicit routing policies', 'Lock ingress to required destinations'],
  },
  {
    id: 'private-service-connect',
    title: 'Private Service Connect',
    category: 'Service access',
    summary: 'Private Service Connect keeps managed service access private while reducing dependency on public IP exposure and broad firewall rules.',
    components: ['Private endpoint', 'Producer service', 'Routing policy', 'Service attachment'],
    bestPractices: ['Keep endpoints limited to required projects', 'Use ingress policy for service attachments', 'Log all access and endpoint changes'],
  },
  {
    id: 'global-lb',
    title: 'Global external load balancer',
    category: 'Availability',
    summary: 'A global external load balancer combines health-aware routing with north-south traffic termination for resilient internet-facing services.',
    components: ['Global forwarding rule', 'Backend service', 'Health checks', 'URL map or proxy'],
    bestPractices: ['Validate backend health before rollout', 'Review latency and region placement', 'Use session affinity only when required'],
  },
  {
    id: 'hybrid-vpn',
    title: 'Hybrid VPN with BGP',
    category: 'Connectivity',
    summary: 'Hybrid connectivity depends on predictable BGP sessions, route propagation, and partner network validation to keep traffic flowing reliably.',
    components: ['Cloud Router', 'VPN tunnels', 'BGP peers', 'Advertised networks'],
    bestPractices: ['Use stable peer IPs and ASNs', 'Validate route origin and blackholes', 'Monitor tunnel and BGP state continuously'],
  },
]
