import { CatchAllActionRenderProps } from "@copilotkit/react-core";

export type ToolProps = CatchAllActionRenderProps & {
  themeColor: string;
};

export function Tool(props: ToolProps) {
  const InfoBox = ({ title, content }: { title: string; content: any }) => (
    <div className="bg-black/30 p-3 rounded-xl">
      <h2 className="text-white text-sm mb-1">{title}</h2>
      <pre className="text-white text-sm overflow-auto max-h-32 font-mono">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );

  return (
    <details style={{ backgroundColor: props.themeColor }} className="p-4 my-2 rounded-xl">
      <summary className="text-white cursor-pointer">
        {props.name} {props.status === "complete" ? "called!" : "executing..."}
      </summary>
      <div className="space-y-2 py-4">
        <div className="grid grid-cols-2 gap-2">
          <InfoBox title="Name" content={props.name} />
          <InfoBox title="Status" content={props.status} />
        </div>
        <InfoBox title="Input" content={props.args} />
        <InfoBox title="Output" content={props.result} />
        <InfoBox title="Full Details" content={props} />
      </div>
    </details>
  );
}