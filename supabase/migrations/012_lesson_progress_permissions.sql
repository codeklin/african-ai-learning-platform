-- Completion toggles need UPDATE for upserts and DELETE for undo actions.
grant select, insert, update, delete on public.lesson_progress to authenticated;

drop policy if exists "Users can update own progress" on public.lesson_progress;
create policy "Users can update own progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own progress" on public.lesson_progress;
create policy "Users can delete own progress"
  on public.lesson_progress for delete
  using (auth.uid() = user_id);
