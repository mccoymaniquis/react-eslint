export function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="container mx-auto px-6 py-4 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          ©
          {" "}
          {new Date().getFullYear()}
          {" "}
          My App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
