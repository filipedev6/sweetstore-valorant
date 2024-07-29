import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TabsContent } from '@/components/ui/tabs'

interface AgentsProps {
  agents: string[]
}

function getAgentsData(agents: string[]) {
  return Promise.all(
    agents.map(async (agent) => {
      const res = await fetch(`https://valorant-api.com/v1/agents/${agent}`)
      const data = await res.json()
      const displayIcon =
        data.data.displayIcon ||
        'https://media.valorant-api.com/weaponskins/5211efa8-4efd-09bb-6cee-72b86a8a5972/displayicon.png'
      const displayName = data.data.displayName || 'Unknown'

      return { displayName, displayIcon }
    }),
  )
}

export async function Agents({ agents }: AgentsProps) {
  const agentsData = await getAgentsData(agents)

  return (
    <TabsContent
      value="agents"
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-sm:grid-cols-2"
    >
      {agentsData.map((agent, index) => (
        <div
          className="flex items-center gap-4 hover:bg-muted transition-all cursor-pointer rounded-md p-2"
          key={index}
        >
          <Avatar className="h-24 w-24 max-sm:h-12 max-sm:w-12">
            <AvatarImage src={agent.displayIcon} alt="Avatar" />
            <AvatarFallback>{agent.displayName.truncate}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none max-sm:text-base">
              {agent.displayName}
            </p>
          </div>
        </div>
      ))}
    </TabsContent>
  )
}
