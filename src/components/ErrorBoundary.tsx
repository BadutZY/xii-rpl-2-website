import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <p className="eyebrow mb-6">Terjadi kesalahan</p>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Halaman ini gagal dimuat
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Ada sesuatu yang tidak berjalan semestinya. Coba muat ulang, atau kembali ke beranda.
          </p>
          {import.meta.env.DEV && error.message && (
            <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-left font-mono text-xs text-destructive">
              {error.message}
            </pre>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={this.handleReset}
              className="btn-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium"
            >
              Coba lagi
            </button>
            <a
              href="/"
              className="btn-secondary-outline inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium"
            >
              Kembali ke beranda
            </a>
          </div>
        </div>
      </div>
    );
  }
}
