import { NextRequest, NextResponse } from 'next/server';

/**
 * PATCH /api/comments/moderate
 * Moderate a comment (admin only)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentId, action, isAdmin } = body;

    // Check admin privileges
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    if (!action || !['approve', 'moderate', 'delete'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be: approve, moderate, or delete' },
        { status: 400 }
      );
    }

    // Map action to status
    const statusMap: Record<string, string> = {
      approve: 'active',
      moderate: 'moderated',
      delete: 'deleted',
    };

    const newStatus = statusMap[action];

    // Mock response - will be replaced with actual DB update
    const mockResponse = {
      commentId,
      status: newStatus,
      message: `Comment ${action}d successfully`,
    };

    return NextResponse.json(mockResponse, { status: 200 });
  } catch (error) {
    console.error('Error moderating comment:', error);
    return NextResponse.json(
      { error: 'Failed to moderate comment' },
      { status: 500 }
    );
  }
}
