
export default function Dashboard() {
  return (
    <div className="p-4">
        <div>
          <h2 className="text-lg font-semibold">Dashboard Overview</h2>
          <p>Welcome to your dashboard! Here is an overview of your activity.</p>
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <div className="aspect-video rounded-xl bg-accent" />
          </div>
      </div>
    </div>
  )
}
