import { CheckCircle2, XCircle } from 'lucide-react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
};

export function Toast({ message, type }: ToastProps) {
  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 duration-300">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl ${
        type === 'success' 
          ? 'bg-white border-2 border-green-200' 
          : 'bg-white border-2 border-red-200'
      }`}>
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
        <p className={type === 'success' ? 'text-green-800' : 'text-red-800'}>
          {message}
        </p>
      </div>
    </div>
  );
}
