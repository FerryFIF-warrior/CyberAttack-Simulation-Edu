<?php

namespace App\Policies;

use App\Models\ChatSession;
use App\Models\User;

class ChatSessionPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, ChatSession $chatSession): bool
    {
        return $chatSession->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, ChatSession $chatSession): bool
    {
        return $chatSession->user_id === $user->id;
    }

    public function delete(User $user, ChatSession $chatSession): bool
    {
        return $chatSession->user_id === $user->id;
    }
}
