
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dqrkynoxaslavepmdpkv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxcmt5bm94YXNsYXZlcG1kcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDIxMjQsImV4cCI6MjA3NjgxODEyNH0.BWuJKujaKatkdWHJRSpiq8jjcz5THYX6COKqQ4H9A8s"
export const supabase = createClient(supabaseUrl, supabaseKey)
