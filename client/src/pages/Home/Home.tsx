import HomeCard from "./Card";

const Home = () => {

  return (
    <div className="flex flex-col xl:flex-row justify-center items-center h-[calc(100vh-72px)]">
      <button><HomeCard path="/locations" content="Locations" /></button>
      <button><HomeCard path="/flow" content="React Flow Example" /></button>
      <button><HomeCard path="/chat" content="Chat" /></button>
    </div>
  )
}

export default Home;
