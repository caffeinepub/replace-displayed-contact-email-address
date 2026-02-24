import { useState, useEffect } from 'react';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function StripeSetup() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [secretKey, setSecretKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const checkStripeConfig = async () => {
      if (!actor || !identity) {
        setIsLoading(false);
        return;
      }

      try {
        const [adminStatus, configStatus] = await Promise.all([
          actor.isCallerAdmin(),
          actor.isStripeConfigured(),
        ]);
        setIsAdmin(adminStatus);
        setIsConfigured(configStatus);
      } catch (error) {
        console.error('Failed to check Stripe configuration:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStripeConfig();
  }, [actor, identity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretKey.trim()) {
      toast.error('Please enter your Stripe secret key');
      return;
    }

    if (!actor) {
      toast.error('Actor not available');
      return;
    }

    setIsSaving(true);
    try {
      await actor.setStripeConfiguration({
        secretKey: secretKey.trim(),
        allowedCountries: ['IN'], // India only for this store
      });
      setIsConfigured(true);
      toast.success('Stripe configured successfully!');
    } catch (error: any) {
      console.error('Failed to configure Stripe:', error);
      toast.error('Failed to configure Stripe. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const showSetup = !isLoading && isAdmin && !isConfigured;

  if (!showSetup) return null;

  return (
    <Dialog open={showSetup} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Configure Stripe Payment</DialogTitle>
          <DialogDescription>
            Enter your Stripe secret key to enable payment processing for your store.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="secretKey">Stripe Secret Key *</Label>
            <Input
              id="secretKey"
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="sk_test_..."
              required
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Find your secret key in your Stripe Dashboard under Developers → API keys
            </p>
          </div>
          <div className="space-y-2">
            <Label>Allowed Countries</Label>
            <Input value="India (IN)" disabled />
            <p className="text-xs text-muted-foreground">
              Currently configured for India only
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Configuring...
              </>
            ) : (
              'Save Configuration'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
