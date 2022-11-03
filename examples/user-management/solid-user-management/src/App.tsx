import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from './supabaseClient'
import { AuthSession } from '@supabase/supabase-js'
import Account from './Account'
import Auth from './Auth'

const App: Component = () => {
	const [session, setSession] = createSignal<AuthSession | null>(null)

	createEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	})

	return (
		<div class="container" style={{ padding: '50px 0 100px 0' }}>
			<Show when={session()} fallback={<Auth />}>
				<Account session={session()!} />
			</Show>
		</div>
	)
}

export default App
