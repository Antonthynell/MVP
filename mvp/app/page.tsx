import StakeholderMap from './components/StakeholderMap'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <h1 className="text-4xl font-bold mb-8">Stakeholder Mapping Tool</h1>
      <StakeholderMap />
    </main>
  )
}