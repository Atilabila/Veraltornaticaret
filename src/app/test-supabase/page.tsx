'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function TestSupabasePage() {
    const [status, setStatus] = useState<{
        connected: boolean;
        tablesExist: boolean;
        productCount: number;
        error?: string;
    }>({
        connected: false,
        tablesExist: false,
        productCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function testConnection() {
            try {
                // Test 1: Basic connection
                const { error: connectionError } = await supabase
                    .from('products')
                    .select('count')
                    .limit(1);

                if (connectionError) {
                    setStatus({
                        connected: false,
                        tablesExist: false,
                        productCount: 0,
                        error: connectionError.message,
                    });
                    setLoading(false);
                    return;
                }

                // Test 2: Count products
                const { count, error: countError } = await supabase
                    .from('products')
                    .select('*', { count: 'exact', head: true });

                setStatus({
                    connected: true,
                    tablesExist: true,
                    productCount: count || 0,
                    error: countError?.message,
                });
            } catch (err) {
                setStatus({
                    connected: false,
                    tablesExist: false,
                    productCount: 0,
                    error: err instanceof Error ? err.message : 'Unknown error',
                });
            } finally {
                setLoading(false);
            }
        }

        testConnection();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">
                    🔍 Supabase Connection Test
                </h1>

                {loading ? (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                        <div className="flex items-center gap-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            <p className="text-white text-lg">Testing connection...</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Connection Status */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-4 h-4 rounded-full ${status.connected ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                ></div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        Database Connection
                                    </h2>
                                    <p className="text-white/70">
                                        {status.connected ? '✅ Connected' : '❌ Not Connected'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tables Status */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-4 h-4 rounded-full ${status.tablesExist ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                ></div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        Database Tables
                                    </h2>
                                    <p className="text-white/70">
                                        {status.tablesExist
                                            ? '✅ Tables exist'
                                            : '❌ Tables not found'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Product Count */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h2 className="text-xl font-semibold text-white mb-2">
                                Product Count
                            </h2>
                            <p className="text-4xl font-bold text-white">
                                {status.productCount}
                            </p>
                            <p className="text-white/70 mt-2">
                                {status.productCount === 0
                                    ? 'No products in database yet'
                                    : `${status.productCount} product(s) found`}
                            </p>
                        </div>

                        {/* Error Display */}
                        {status.error && (
                            <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/50">
                                <h2 className="text-xl font-semibold text-red-300 mb-2">
                                    ⚠️ Error
                                </h2>
                                <p className="text-red-200 font-mono text-sm break-all">
                                    {status.error}
                                </p>
                            </div>
                        )}

                        {/* Next Steps */}
                        <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/50">
                            <h2 className="text-xl font-semibold text-blue-300 mb-4">
                                📋 Next Steps
                            </h2>
                            <ul className="space-y-2 text-blue-200">
                                {!status.connected && (
                                    <li>
                                        1. Check your .env.local file has correct Supabase
                                        credentials
                                    </li>
                                )}
                                {!status.tablesExist && status.connected && (
                                    <li>
                                        2. Run the schema.sql file in Supabase SQL Editor
                                    </li>
                                )}
                                {status.productCount === 0 && status.tablesExist && (
                                    <li>
                                        3. Import products using seed.sql or admin panel
                                    </li>
                                )}
                                {status.connected && status.tablesExist && (
                                    <li className="text-green-300">
                                        ✅ Everything looks good! Ready to import products.
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Connection Details */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                🔧 Connection Details
                            </h2>
                            <div className="space-y-2 text-sm font-mono">
                                <div>
                                    <span className="text-white/50">URL:</span>
                                    <span className="text-white ml-2">
                                        {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-white/50">Key:</span>
                                    <span className="text-white ml-2">
                                        {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                                            ? '••••••••••••'
                                            : 'Not set'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
