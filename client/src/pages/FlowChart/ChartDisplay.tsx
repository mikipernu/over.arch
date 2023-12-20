import ReactFlow, { Background, Controls, DefaultEdgeOptions, Edge, EdgeTypes, FitViewOptions, Node, NodeTypes, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow';
import 'reactflow/dist/style.css';
import { shallow } from 'zustand/shallow';
import CircularNode from './CircularNode';
import CustomEdge from './CustomEdge';
import useStore from './store';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes: NodeTypes = {
  custom: CircularNode,
}

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function ChartDisplay() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  return (
    <div>
      <div style={{ marginLeft: '4vw', marginTop: '6vh', padding: '20px', height: '80vh', width: '92vw', border: '1px solid #EEEEEE' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}