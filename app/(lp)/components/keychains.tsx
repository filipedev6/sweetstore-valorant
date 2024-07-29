import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { TabsContent } from '@/components/ui/tabs'

interface KeyChainsProps {
  keychains: string[]
}

function getKeyChainsData(keychains: string[]) {
  return Promise.all(
    keychains.map(async (keychain) => {
      const res = await fetch(`https://valorant-api.com/v1/buddies/${keychain}`)
      const data = await res.json()
      const displayIcon =
        data.data.displayIcon ||
        'https://media.valorant-api.com/weaponskins/5211efa8-4efd-09bb-6cee-72b86a8a5972/displayicon.png'
      const displayName = data.data.displayName || 'Unknown'
      const levels =
        (data.data.levels as {
          displayName: string
          displayIcon: string
          charmLevel: number
        }[]) || 'Unknown'

      return { displayName, displayIcon, levels }
    }),
  )
}

export async function KeyChains({ keychains }: KeyChainsProps) {
  const keychainsData = await getKeyChainsData(keychains)

  return (
    <TabsContent
      value="keychains"
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-sm:grid-cols-2"
    >
      {keychainsData.map((agent, index) => (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-4 hover:bg-muted transition-all cursor-pointer rounded-md p-2">
              <Avatar className="h-32 w-32 max-sm:h-32 max-sm:w-32">
                <AvatarImage src={agent.displayIcon} alt="Avatar" />
                <AvatarFallback>{null}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none max-sm:text-base truncate">
                  {agent.displayName}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 mx-4">
            <div className="grid gap-4">
              {agent.levels.map((level, index) => (
                <div className="grid gap-2" key={index}>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-32 w-32 max-sm:h-32 max-sm:w-32">
                      <AvatarImage src={level.displayIcon} alt="Avatar" />
                      <AvatarFallback>{null}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 text-left">
                      <p className="text-sm font-medium leading-none max-sm:text-base">
                        {level.displayName}
                      </p>
                      <p className="text-xs font-medium leading-none max-sm:text-sm">
                        Level: {level.charmLevel}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </TabsContent>
  )
}
