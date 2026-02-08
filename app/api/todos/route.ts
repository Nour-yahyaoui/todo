import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    const todos = await sql`
      SELECT 
        id,
        user_id,
        title,
        description,
        category,
        deadline,
        done
      FROM todos 
      WHERE user_id = ${userIdNum}
      ORDER BY 
        CASE WHEN done THEN 1 ELSE 0 END,
        CASE WHEN deadline IS NULL THEN 1 ELSE 0 END,
        deadline ASC
    `;
    
    return NextResponse.json(todos);
    
  } catch (error: any) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, description, category, deadline } = body;
    
    console.log('Creating todo with data:', body);
    
    if (!userId || !title) {
      return NextResponse.json(
        { error: 'User ID and title are required' },
        { status: 400 }
      );
    }
    
    const todo = await sql`
      INSERT INTO todos (user_id, title, description, category, deadline, done)
      VALUES (${userId}, ${title}, ${description || null}, ${category || null}, ${deadline || null}, false)
      RETURNING *
    `;
    
    console.log('Todo created:', todo[0]);
    return NextResponse.json({ todo: todo[0] });
    
  } catch (error: any) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Todo ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    console.log('Updating todo', id, 'with:', body);
    
    // Build dynamic update using tagged template literal
    const updates: any = {};
    const values: any[] = [];
    
    if (body.title !== undefined) {
      updates.title = body.title;
      values.push(body.title);
    }
    if (body.description !== undefined) {
      updates.description = body.description;
      values.push(body.description);
    }
    if (body.category !== undefined) {
      updates.category = body.category;
      values.push(body.category);
    }
    if (body.deadline !== undefined) {
      updates.deadline = body.deadline;
      values.push(body.deadline);
    }
    if (body.done !== undefined) {
      updates.done = body.done;
      values.push(body.done);
    }
    
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No updates provided' },
        { status: 400 }
      );
    }
    
    // Create SET clause parts
    const setParts = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 1}`)
      .join(', ');
    
    // Full SQL query with parameters
    const query = `UPDATE todos SET ${setParts} WHERE id = $${values.length + 1} RETURNING *`;
    const allValues = [...values, parseInt(id)];
    
    // Execute with sql.query() for dynamic queries
    const result = await sql.query(query, allValues);
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ todo: result[0] });
    
  } catch (error: any) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Todo ID is required' },
        { status: 400 }
      );
    }
    
    console.log('Deleting todo:', id);
    
    const result = await sql`
      DELETE FROM todos 
      WHERE id = ${parseInt(id)}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Todo deleted' });
    
  } catch (error: any) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}