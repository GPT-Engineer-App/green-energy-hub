import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### event

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| created_at | timestamptz | string | true     |
| date       | date        | string | true     |

### user

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| email      | text        | string | true     |
| created_at | timestamptz | string | true     |

### subscription

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| user_id    | int8        | number | true     |
| plan       | text        | string | true     |
| created_at | timestamptz | string | true     |

### payment

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| user_id    | int8        | number | true     |
| amount     | numeric     | number | true     |
| created_at | timestamptz | string | true     |

*/

// Hooks for event table
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('event').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['event', id],
    queryFn: () => fromSupabase(supabase.from('event').select('*').eq('id', id).single()),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('event').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('event').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for user table
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('user').select('*')),
});

export const useUser = (id) => useQuery({
    queryKey: ['user', id],
    queryFn: () => fromSupabase(supabase.from('user').select('*').eq('id', id).single()),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('user').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('user').update(updatedUser).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Hooks for subscription table
export const useSubscriptions = () => useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => fromSupabase(supabase.from('subscription').select('*')),
});

export const useSubscription = (id) => useQuery({
    queryKey: ['subscription', id],
    queryFn: () => fromSupabase(supabase.from('subscription').select('*').eq('id', id).single()),
});

export const useAddSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSubscription) => fromSupabase(supabase.from('subscription').insert([newSubscription])),
        onSuccess: () => {
            queryClient.invalidateQueries('subscriptions');
        },
    });
};

export const useUpdateSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedSubscription) => fromSupabase(supabase.from('subscription').update(updatedSubscription).eq('id', updatedSubscription.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('subscriptions');
        },
    });
};

export const useDeleteSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('subscription').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('subscriptions');
        },
    });
};

// Hooks for payment table
export const usePayments = () => useQuery({
    queryKey: ['payments'],
    queryFn: () => fromSupabase(supabase.from('payment').select('*')),
});

export const usePayment = (id) => useQuery({
    queryKey: ['payment', id],
    queryFn: () => fromSupabase(supabase.from('payment').select('*').eq('id', id).single()),
});

export const useAddPayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPayment) => fromSupabase(supabase.from('payment').insert([newPayment])),
        onSuccess: () => {
            queryClient.invalidateQueries('payments');
        },
    });
};

export const useUpdatePayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPayment) => fromSupabase(supabase.from('payment').update(updatedPayment).eq('id', updatedPayment.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('payments');
        },
    });
};

export const useDeletePayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('payment').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('payments');
        },
    });
};