import { supabase } from './client';
import { SiteContent } from '@/store/useContentStore';

export class ContentService {
    static async getContent(): Promise<Partial<SiteContent> | null> {
        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('data')
                .eq('key', 'main_config')
                .single();

            if (error) {
                console.warn('Content fetch error:', error.message);
                return null;
            }

            return data?.data as Partial<SiteContent>;
        } catch (err) {
            console.error('Content service error:', err);
            return null;
        }
    }

    static async saveContent(content: SiteContent): Promise<boolean> {
        try {
            const { error } = await supabase
                .from('site_content')
                .upsert({
                    key: 'main_config',
                    data: content,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'key' });

            if (error) {
                console.error('Content save error:', error.message);
                return false;
            }

            return true;
        } catch (err) {
            console.error('Content save service error:', err);
            return false;
        }
    }
}
