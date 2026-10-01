export interface TroubleshootingScenario {
  id: string
  title: string
  symptom: string
  summary: string
  steps: string[]
}

export const troubleshootingScenarios: TroubleshootingScenario[] = [
  {
    id: 'vm-internet',
    title: 'VM cannot reach the Internet',
    symptom: 'VM connectivity',
    summary: 'Check the route, firewall, NAT, and external IP configuration before assuming the VM itself is broken.',
    steps: ['Describe the VM', 'List routes', 'List firewall rules', 'Check Cloud NAT', 'Review Flow Logs'],
  },
  {
    id: 'vm-vm',
    title: 'VM cannot reach another VM',
    symptom: 'East-west connectivity',
    summary: 'Confirm the source and destination are in the same VPC or connected via peering, and verify firewall and route rules.',
    steps: ['Verify VPC/subnet', 'Check route tables', 'Inspect firewall rules', 'Run connectivity test'],
  },
  {
    id: 'vpn-down',
    title: 'VPN tunnel is down',
    symptom: 'Hybrid connectivity',
    summary: 'Validate tunnel state, peer reachability, BGP session state, and Cloud Router configuration.',
    steps: ['List tunnels', 'Describe tunnel', 'Check BGP peers', 'Review route advertisements'],
  },
  {
    id: 'bgp-down',
    title: 'BGP session is down',
    symptom: 'Routing',
    summary: 'Look for ASN mismatches, incorrect peer IPs, and Cloud Router or firewall issues affecting BGP establishment.',
    steps: ['Describe router', 'List BGP peers', 'Check peer connectivity', 'Review logs'],
  },
  {
    id: 'nat-failure',
    title: 'Cloud NAT not working',
    symptom: 'Outbound internet',
    summary: 'Verify the NAT gateway attached to the proper router, region, and source subnet range.',
    steps: ['List NAT gateways', 'Describe NAT configuration', 'Check NAT logs', 'Inspect firewall rules'],
  },
  {
    id: 'lb-503',
    title: 'Load balancer returns 503',
    symptom: 'Application availability',
    summary: 'Check the backend health state, forwarding rule, and backend service configuration.',
    steps: ['List forwarding rules', 'Check backend services', 'Review health checks', 'Check firewall rules'],
  },
  {
    id: 'dns-failure',
    title: 'DNS does not resolve',
    symptom: 'Name resolution',
    summary: 'Validate the zone, record set, VM resolver configuration, and any private DNS forwarding chain.',
    steps: ['List zones', 'Describe zone', 'Check resolver', 'Run dig'],
  },
  {
    id: 'gke-pod',
    title: 'GKE pod cannot reach external API',
    symptom: 'Container networking',
    summary: 'Confirm the pod network, egress policy, NAT usage, and whether VPC-native routing or firewall rules block the path.',
    steps: ['Inspect pod network', 'Check NAT', 'Check firewall', 'Review DNS and logs'],
  },
]
