import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const clone = request.clone();
        const eventType = request.headers.get('X-Event-Name');
        const signature = request.headers.get('X-Signature');
        const body = await request.json();

        // Verify signature (Mock logic - in production, verify against LE_SIGNING_SECRET)
        const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || 'mock-secret';
        // const hmac = crypto.createHmac('sha256', secret);
        // const digest = hmac.update(await clone.text()).digest('hex');
        // if (signature !== digest) return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });

        if (eventType === 'order_created') {
            const email = body.data.attributes.user_email;
            const variantName = body.data.attributes.first_order_item.variant_name;

            console.log(`💰 Payment Received: ${email} for ${variantName}`);

            const supabase = await createClient();

            // Update user subscription status (Example Logic)
            // In real app, we might need to look up user by email or store customer_id
            // const { error } = await supabase.from('profiles').update({ ... }).eq('email', email);
        }

        return NextResponse.json({ message: 'Webhook received' });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
