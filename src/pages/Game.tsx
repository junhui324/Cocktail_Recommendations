import Layout from "../Layout/Layout";
import GameStart from "../components/Game/GameStart";
import PageCard from "../components/Common/PageCard";
function Game() {
  return (
    <Layout>
      <PageCard>
        <GameStart />
      </PageCard>
    </Layout>
  );
}

export default Game;
