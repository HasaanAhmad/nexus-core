import { auth } from "@/server/auth";


const page = async () => {
    const session = await auth();
  return (
    <div>
        <h1>Session</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default page