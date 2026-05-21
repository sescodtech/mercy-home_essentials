import { NextRequest, NextResponse } from 'next/server';

// Mock reviews data - replace with database queries
const MOCK_REVIEWS = [
  {
    id: '1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Absolutely Perfect!',
    comment: 'Exceeded my expectations. Premium quality and fast shipping.',
    verified: true,
    helpful: 12,
    unhelpful: 1,
    createdAt: new Date('2024-05-15'),
  },
  {
    id: '2',
    userName: 'James T.',
    rating: 4,
    title: 'Great product, minor issue',
    comment: 'The quality is excellent but packaging could be better.',
    verified: true,
    helpful: 8,
    unhelpful: 0,
    createdAt: new Date('2024-05-10'),
  },
  {
    id: '3',
    userName: 'Emma L.',
    rating: 5,
    title: 'Worth every penny',
    comment: 'Luxury at its finest. Would definitely recommend to friends.',
    verified: true,
    helpful: 25,
    unhelpful: 2,
    createdAt: new Date('2024-05-05'),
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const sort = request.nextUrl.searchParams.get('sort') || 'recent';
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = 5;

    // TODO: Replace with database query
    // const reviews = await Review.find({ productId })
    //   .sort(sort === 'recent' ? { createdAt: -1 } : { helpful: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    const sortedReviews =
      sort === 'helpful'
        ? [...MOCK_REVIEWS].sort((a, b) => b.helpful - a.helpful)
        : [...MOCK_REVIEWS].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

    const paginatedReviews = sortedReviews.slice(
      (page - 1) * limit,
      page * limit
    );

    const averageRating =
      MOCK_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / MOCK_REVIEWS.length;

    return NextResponse.json({
      reviews: paginatedReviews,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews: MOCK_REVIEWS.length,
      totalPages: Math.ceil(MOCK_REVIEWS.length / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { rating, title, comment, userName } = body;

    if (!rating || !title || !comment || !userName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Replace with database insert
    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      userName,
      rating,
      title,
      comment,
      verified: true,
      helpful: 0,
      unhelpful: 0,
      createdAt: new Date(),
    };

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
