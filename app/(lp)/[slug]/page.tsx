import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { notFound } from 'next/navigation'
import { Agents } from '../components/agents'
import { BackgroundEffect } from '../components/background-effect'
import { InformationCard } from '../components/information-card'
import { KeyChains } from '../components/keychains'
import { Skins } from '../components/skins'

interface HomeProps {
  params: { slug: string }
}

async function getData(slug: string) {
  const response = await fetch(`https://api.lzt.market/${slug}`, {
    method: 'GET',
    headers: { authorization: `Bearer ${process.env.LZT_MARKET_API_KEY}` },
  })

  if (response.status !== 200) {
    throw new Error('Error fetching data')
  }

  const data = await response.json()

  return data
}

export default async function Home({ params }: HomeProps) {
  try {
    const data = await getData(params.slug)

    return (
      <div className="max-w-7xl mx-auto py-6 px-6">
        <div className="flex flex-col  mb-5">
          <h1 className="text-3xl font-bold tracking-tight max-sm:text-2xl">
            Informações da conta:{' '}
            <span className="text-primary">{params.slug}</span>
          </h1>
        </div>

        <BackgroundEffect />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InformationCard
            title="Radiant Points"
            value={data.item.valorant_wallet_rp}
          />
          <InformationCard title="Level" value={data.item.valorant_level} />
          <InformationCard
            title="Valorant Points"
            value={data.item.valorant_wallet_vp}
          />
          <InformationCard
            title="Valor do inventario (VP)"
            value={data.item.valorant_inventory_value}
          />
        </div>

        <div className="pt-6">
          <Tabs defaultValue="agents" className="space-y-4 max-sm:w-full">
            <TabsList className="max-sm:w-full max-sm:h-14">
              <TabsTrigger
                value="skins"
                className="max-sm:w-full max-sm:h-full"
              >
                Skins
              </TabsTrigger>
              <TabsTrigger
                value="agents"
                className="max-sm:w-full max-sm:h-full"
              >
                Agentes
              </TabsTrigger>
              <TabsTrigger
                value="keychains"
                className="max-sm:w-full max-sm:h-full"
              >
                Chaveiros
              </TabsTrigger>
            </TabsList>
            <Agents agents={data.item.valorantInventory.Agent} />
            <KeyChains keychains={data.item.valorantInventory.Buddy} />
            <Skins skins={data.item.valorantInventory.WeaponSkins} />
          </Tabs>
        </div>
      </div>
    )
  } catch (error) {
    if (params.slug.match(/[a-zA-Z]/)) {
      return notFound()
    }

    return (
      <div className="flex justify-center min-h-screen items-center">
        <p className="text-base">Essa conta não foi encontrada :/</p>
      </div>
    )
  }
}
