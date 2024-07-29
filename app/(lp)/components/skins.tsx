import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { TabsContent } from '@/components/ui/tabs'

interface KeyChainsProps {
  skins: string[]
}

function getSkinsData(skins: string[]) {
  return Promise.all(
    skins.map(async (skin) => {
      const res = await fetch(
        `https://valorant-api.com/v1/weapons/skins/${skin}`,
      )
      const data = await res.json()
      const displayIcon =
        data.data.displayIcon ||
        'https://media.valorant-api.com/weaponskins/5211efa8-4efd-09bb-6cee-72b86a8a5972/displayicon.png'
      const displayName = data.data.displayName || 'Unknown'
      const chromas =
        (data.data.chromas as {
          displayName: string
          displayIcon: string
        }[]) || 'Unknown'

      return { displayName, displayIcon, chromas }
    }),
  )
}

export async function Skins({ skins }: KeyChainsProps) {
  const skinsData = await getSkinsData(skins)

  return (
    <TabsContent
      value="skins"
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-sm:grid-cols-2"
    >
      {skinsData.map((skin, index) => (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-4 hover:bg-muted transition-all cursor-pointer rounded-md p-2">
              <Avatar className="h-32 w-32 max-sm:h-12 max-sm:w-12">
                <AvatarImage
                  src={skin.displayIcon}
                  alt="Avatar"
                  className="object-contain object-center"
                />
                <AvatarFallback>{skin.displayName.truncate}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none max-sm:text-base truncate">
                  {skin.displayName}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 mx-4">
            <div className="grid gap-4">
              {skin.chromas.map((chroma, index) => (
                <div className="grid gap-2" key={index}>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-32 w-32 max-sm:h-32 max-sm:w-32">
                      <AvatarImage
                        src={chroma.displayIcon}
                        alt="Avatar"
                        className="object-contain object-center"
                      />
                      <AvatarFallback>{null}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 text-left">
                      <p className="text-sm font-medium leading-none max-sm:text-sm">
                        {chroma.displayName.replace(/([^\n]*)\n.*/, '$1')}
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
