import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <span className="text-3xl font-bold mb-2">Welcome Home</span>
      <p className="text-muted-foreground">
        This is your private dashboard.
      </p>

      <div className="mt-4">
        {/* Your page-specific content here */}
        <p>This is the main content area.</p>
        <p>Feel free to customize it as needed.</p>

      </div>
    </Layout>
  );
}
