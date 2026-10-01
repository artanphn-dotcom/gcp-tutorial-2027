export interface LearningModule {
  id: string
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  service: string
  summary: string
  keyPoints: string[]
}

export const learningModules: LearningModule[] = [
  {
    id: 'what-is-vpc',
    title: 'What is a VPC?',
    level: 'Beginner',
    service: 'VPC',
    summary: 'A VPC is a global virtual network that provides isolation, IP ranges, routing, and firewall boundaries to Google Cloud resources.',
    keyPoints: ['Isolation boundary', 'IP ranges and subnets', 'Routing and firewall policy', 'Resource connectivity'],
  },
  {
    id: 'what-is-subnet',
    title: 'What is a subnet?',
    level: 'Beginner',
    service: 'VPC',
    summary: 'Subnets divide a VPC into regional IP ranges and determine where VMs and other resources receive their private addresses.',
    keyPoints: ['Regional scope', 'Primary ranges', 'Secondary ranges', 'CIDR planning'],
  },
  {
    id: 'what-is-route',
    title: 'Routing and routes',
    level: 'Beginner',
    service: 'VPC',
    summary: 'Routes decide where traffic goes based on destination ranges and next hops, which is critical to diagnosing connectivity issues.',
    keyPoints: ['Default route', 'Custom route', 'Next hop', 'Route priority'],
  },
  {
    id: 'what-is-firewall',
    title: 'Firewall fundamentals',
    level: 'Beginner',
    service: 'Firewall',
    summary: 'Firewall rules control ingress and egress traffic and are evaluated in priority order for the target network, tags, or service accounts.',
    keyPoints: ['Ingress and egress', 'Priority', 'Targets', 'Protocols and ports'],
  },
  {
    id: 'what-is-cloud-router',
    title: 'Cloud Router',
    level: 'Intermediate',
    service: 'Cloud Router',
    summary: 'Cloud Router manages dynamic routing for Cloud VPN, Cloud Interconnect, and custom advertisements with BGP.',
    keyPoints: ['BGP exchange', 'Dynamic routing', 'Regional scope', 'Learned and advertised routes'],
  },
  {
    id: 'what-is-bgp',
    title: 'BGP essentials',
    level: 'Intermediate',
    service: 'BGP',
    summary: 'Border Gateway Protocol exchanges routing information between autonomous systems and is the standard mechanism for hybrid connectivity.',
    keyPoints: ['AS number', 'Session state', 'Prefix advertisement', 'Route learning'],
  },
  {
    id: 'cloud-nat',
    title: 'Cloud NAT',
    level: 'Intermediate',
    service: 'Cloud NAT',
    summary: 'Cloud NAT provides outbound internet connectivity for private VMs without public IPs and is commonly used with private instances.',
    keyPoints: ['Private VM egress', 'NAT IP allocation', 'Port usage', 'Logging'],
  },
  {
    id: 'dns-basics',
    title: 'DNS and name resolution',
    level: 'Intermediate',
    service: 'DNS',
    summary: 'DNS converts names to IPs and is often the first place to check when a service resolves incorrectly or not at all.',
    keyPoints: ['Public zones', 'Private zones', 'Forwarding', 'Split-horizon'],
  },
  {
    id: 'load-balancer-architecture',
    title: 'Load balancing architecture',
    level: 'Intermediate',
    service: 'Load Balancing',
    summary: 'Google Cloud load balancers terminate or pass traffic at different layers and rely on forwarding rules, backends, and health checks.',
    keyPoints: ['Forwarding rule', 'Backend service', 'Health checks', 'URL routing'],
  },
  {
    id: 'vpc-flow-logs',
    title: 'VPC Flow Logs',
    level: 'Intermediate',
    service: 'VPC Flow Logs',
    summary: 'Flow Logs capture the actual traffic metadata for VMs and subnets, helping confirm whether packets are being sent, dropped, or rerouted.',
    keyPoints: ['src/dst IPs', 'ports', 'protocols', 'direction and bytes'],
  },
  {
    id: 'shared-vpc',
    title: 'Shared VPC',
    level: 'Advanced',
    service: 'VPC',
    summary: 'Shared VPC lets an organization host a common network and let multiple projects attach resources to it with delegated administration.',
    keyPoints: ['Host project', 'Service project', 'Subnet sharing', 'IAM boundary'],
  },
  {
    id: 'private-service-connect',
    title: 'Private Service Connect',
    level: 'Advanced',
    service: 'Private Service Connect',
    summary: 'Private Service Connect provides private access to managed services and internal endpoints without exposing them on public IPs.',
    keyPoints: ['Private endpoint', 'Service producer', 'Private access', 'Security boundary'],
  },
]
