import { Subject } from '../types';

// Mock API for frontend-only deployment
console.log('🔧 Frontend-Only Configuration:', {
  deployment: 'netlify-frontend-only',
  apiMode: 'mock',
  note: 'Using mock responses for demo purposes'
});

// === Mock API Responses ===
const mockReasoningResponses = {
  'Linear Algebra': `## 🧱 Assumptions
- Working in vector space with standard operations
- Using axioms of vector spaces and linear independence

## 🧠 Logical Steps

**Step 1:** Analyze the given vectors
Given vectors: \\( v_1 = (1, 2, 3) \\) and \\( v_2 = (4, 5, 6) \\)

**Intermediate Formal Check:** These are vectors in \\( \\mathbb{R}^3 \\).

**Step 2:** Check for linear independence
To determine if \\( v_1 \\) and \\( v_2 \\) are linearly independent, we solve:
\\[ c_1 v_1 + c_2 v_2 = 0 \\]

**Intermediate Formal Check:** This gives us the system:
\\[ c_1(1, 2, 3) + c_2(4, 5, 6) = (0, 0, 0) \\]

**Step 3:** Solve the system
\\[ \\begin{cases}
c_1 + 4c_2 = 0 \\\\
2c_1 + 5c_2 = 0 \\\\
3c_1 + 6c_2 = 0
\\end{cases} \\]

**Intermediate Formal Check:** From the first equation: \\( c_1 = -4c_2 \\)
Substituting into the second: \\( 2(-4c_2) + 5c_2 = -8c_2 + 5c_2 = -3c_2 = 0 \\)
Therefore \\( c_2 = 0 \\) and \\( c_1 = 0 \\).

**Step 4:** Conclude linear independence
Since the only solution is \\( c_1 = c_2 = 0 \\), the vectors are linearly independent.

**Intermediate Formal Check:** Two linearly independent vectors in \\( \\mathbb{R}^3 \\) span a 2-dimensional subspace.

## 🔍 Self-Audit Result
The reasoning follows standard linear algebra methodology. Each step is logically sound and properly justified using vector space axioms.

## ✅ Final Result
My best answer is \\( \\boxed{\\{(1, 2, 3), (4, 5, 6)\\}} \\)

The basis for the vector space spanned by the given vectors is the set containing both vectors, as they are linearly independent.`,

  'Number Theory': `## 🧱 Assumptions
- Working with the natural numbers ℕ and properties of prime numbers
- Using proof by contradiction and fundamental theorem of arithmetic

## 🧠 Logical Steps

**Step 1:** Assume for contradiction that there are only finitely many primes
Let \\( p_1, p_2, p_3, \\ldots, p_k \\) be all the prime numbers.

**Intermediate Formal Check:** This follows from our assumption for contradiction.

**Step 2:** Construct a new number
Consider \\( N = p_1 \\cdot p_2 \\cdot p_3 \\cdots p_k + 1 \\)

**Intermediate Formal Check:** This number is well-defined since we're adding 1 to the product of finitely many primes.

**Step 3:** Analyze the divisibility of N
Since \\( N > 1 \\), by the fundamental theorem of arithmetic, N must have at least one prime divisor.

**Intermediate Formal Check:** This follows from the fundamental theorem of arithmetic.

**Step 4:** Show N is not divisible by any known prime
For any prime \\( p_i \\) in our list, we have:
\\[ N = p_1 \\cdot p_2 \\cdots p_k + 1 \\equiv 1 \\pmod{p_i} \\]

**Intermediate Formal Check:** Since \\( p_i \\) divides the product \\( p_1 \\cdot p_2 \\cdots p_k \\), the remainder when dividing N by \\( p_i \\) is 1.

**Step 5:** Reach the contradiction
N must have a prime divisor, but this divisor cannot be any of \\( p_1, p_2, \\ldots, p_k \\). Therefore, there exists a prime not in our original list.

**Intermediate Formal Check:** This contradicts our assumption that \\( p_1, p_2, \\ldots, p_k \\) were all the primes.

## 🔍 Self-Audit Result
The proof follows Euclid's classical argument and uses only basic properties of primes and divisibility. Each step is logically sound.

## ✅ Final Result
My best answer is \\( \\boxed{\\text{There are infinitely many prime numbers}} \\)`,

  'Real Analysis': `## 🧱 Assumptions
- Working with real numbers and limit definitions
- Using properties of convergent sequences

## 🧠 Logical Steps

**Step 1:** State what we need to prove
We need to show that \\( \\lim_{n \\to \\infty} \\frac{n^2 + 1}{2n^2 - 1} = \\frac{1}{2} \\)

**Intermediate Formal Check:** This follows the standard definition of sequence convergence.

**Step 2:** Apply the formal definition of limit
For any \\( \\epsilon > 0 \\), we need to find \\( N \\) such that for all \\( n > N \\):
\\[ \\left| \\frac{n^2 + 1}{2n^2 - 1} - \\frac{1}{2} \\right| < \\epsilon \\]

**Intermediate Formal Check:** This is the \\( \\epsilon \\)-\\( N \\) definition of convergence.

**Step 3:** Simplify the expression
\\[ \\frac{n^2 + 1}{2n^2 - 1} - \\frac{1}{2} = \\frac{2(n^2 + 1) - (2n^2 - 1)}{2(2n^2 - 1)} = \\frac{2n^2 + 2 - 2n^2 + 1}{2(2n^2 - 1)} = \\frac{3}{2(2n^2 - 1)} \\]

**Intermediate Formal Check:** Algebraic manipulation is correct.

**Step 4:** Find the bound
We need \\( \\frac{3}{2(2n^2 - 1)} < \\epsilon \\)

For large \\( n \\), \\( 2n^2 - 1 > n^2 \\), so:
\\[ \\frac{3}{2(2n^2 - 1)} < \\frac{3}{2n^2} \\]

**Intermediate Formal Check:** This inequality holds for \\( n \\geq 1 \\).

**Step 5:** Choose N
Choose \\( N = \\sqrt{\\frac{3}{2\\epsilon}} \\). Then for \\( n > N \\):
\\[ \\frac{3}{2n^2} < \\frac{3}{2N^2} = \\epsilon \\]

**Intermediate Formal Check:** This completes the proof by the definition of convergence.

## 🔍 Self-Audit Result
The proof uses standard real analysis techniques and the formal definition of convergence. All algebraic steps are verified.

## ✅ Final Result
My best answer is \\( \\boxed{\\frac{1}{2}} \\)`,

  'Abstract Algebra': `## 🧱 Assumptions
- Working with group theory and properties of finite groups
- Using Lagrange's theorem and classification of groups

## 🧠 Logical Steps

**Step 1:** Consider the structure of groups of order \\( p^2 \\)
Let \\( G \\) be a group of order \\( p^2 \\) where \\( p \\) is prime.

**Intermediate Formal Check:** By Lagrange's theorem, every element has order dividing \\( p^2 \\).

**Step 2:** Analyze possible element orders
The possible orders of elements in \\( G \\) are 1, \\( p \\), and \\( p^2 \\).

**Intermediate Formal Check:** These are the only divisors of \\( p^2 \\).

**Step 3:** Case 1 - G has an element of order \\( p^2 \\)
If \\( G \\) has an element \\( g \\) of order \\( p^2 \\), then \\( G = \\langle g \\rangle \\) is cyclic.

**Intermediate Formal Check:** A cyclic group is always abelian.

**Step 4:** Case 2 - All non-identity elements have order \\( p \\)
If every non-identity element has order \\( p \\), then \\( G \\) has \\( p^2 - 1 \\) elements of order \\( p \\).

**Intermediate Formal Check:** These elements, together with the identity, account for all elements of \\( G \\).

**Step 5:** Apply the class equation
By the class equation and properties of \\( p \\)-groups, the center \\( Z(G) \\) is non-trivial.
Since \\( |Z(G)| \\) divides \\( |G| = p^2 \\), we have \\( |Z(G)| \\in \\{p, p^2\\} \\).

**Intermediate Formal Check:** If \\( |Z(G)| = p^2 \\), then \\( G = Z(G) \\) is abelian.
If \\( |Z(G)| = p \\), then \\( |G/Z(G)| = p \\), so \\( G/Z(G) \\) is cyclic, which implies \\( G \\) is abelian.

## 🔍 Self-Audit Result
The proof uses fundamental results from group theory including Lagrange's theorem and the class equation. Both cases are properly analyzed.

## ✅ Final Result
My best answer is \\( \\boxed{\\text{Every group of order } p^2 \\text{ is abelian}} \\)`
};

const mockAuditResponses = [
  `## 🔍 Self-Audit Summary

**Logical Flow:** ✅ Sound reasoning chain from axioms to conclusion

**Axiom Usage:** ✅ Proper citations and applications of fundamental theorems

**Step Verification:** ✅ All intermediate checks performed correctly

**Mathematical Rigor:** ✅ Each step follows logically from previous steps

**Conclusion:** High-quality mathematical reasoning with proper formal structure.

**Note:** This is a mock audit response for demonstration purposes.`,

  `## 🔍 Self-Audit Summary

**Proof Structure:** ✅ Classical proof technique properly applied

**Logical Consistency:** ✅ No gaps or contradictions detected

**Mathematical Notation:** ✅ Proper use of mathematical symbols and formatting

**Completeness:** ✅ All necessary steps included

**Overall Assessment:** Excellent mathematical reasoning that follows established proof methodologies.

**Note:** This is a mock audit response for demonstration purposes.`
];

// === Main API Call (Mock) ===
export async function callBackendAPI(problem: string, subject: Subject): Promise<{ success: boolean; reasoning?: string; error?: string }> {
  try {
    console.log(`🎭 Mock API Call:`, {
      subject,
      problemLength: problem.length,
      timestamp: new Date().toISOString()
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    // Get mock response based on subject or problem content
    let reasoning = mockReasoningResponses[subject];
    
    // Check for specific problems
    if (problem.toLowerCase().includes('infinitely many primes') || problem.toLowerCase().includes('infinite primes')) {
      reasoning = mockReasoningResponses['Number Theory'];
    } else if (problem.toLowerCase().includes('basis') || problem.toLowerCase().includes('vector')) {
      reasoning = mockReasoningResponses['Linear Algebra'];
    } else if (problem.toLowerCase().includes('converge') || problem.toLowerCase().includes('sequence')) {
      reasoning = mockReasoningResponses['Real Analysis'];
    } else if (problem.toLowerCase().includes('group') || problem.toLowerCase().includes('abelian')) {
      reasoning = mockReasoningResponses['Abstract Algebra'];
    }

    console.log('✅ Mock API Success');

    return {
      success: true,
      reasoning: reasoning + '\n\n**Note:** This response was generated by Mock API for demonstration purposes. Connect a real backend for actual AI-powered mathematical reasoning.'
    };
    
  } catch (error) {
    console.error('❌ Mock API Error:', error);
    return {
      success: false,
      error: `Mock API Error: ${error?.message || 'Unknown error'}`
    };
  }
}

// === Audit API (Mock) ===
export async function callBackendAudit(reasoning: string): Promise<{ success: boolean; audit?: string; error?: string }> {
  try {
    console.log(`🔍 Mock Audit API Call`);

    // Simulate audit delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const randomAudit = mockAuditResponses[Math.floor(Math.random() * mockAuditResponses.length)];

    console.log('✅ Mock Audit Success');

    return {
      success: true,
      audit: randomAudit
    };
  } catch (error) {
    console.error('❌ Mock Audit Error:', error);
    return {
      success: false,
      error: error?.message || 'Mock Audit API unavailable'
    };
  }
}

// === OCR API (Mock) ===
export async function callOCRAPI(imageFile: File): Promise<{ success: boolean; text?: string; error?: string }> {
  try {
    console.log(`📷 Mock OCR API Call`);

    // Simulate OCR delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock extracted text based on common math problems
    const mockTexts = [
      "Find the derivative of f(x) = x^3 + 2x^2 - 5x + 1",
      "Prove that the limit of (n^2 + 1)/(2n^2 - 1) as n approaches infinity is 1/2",
      "Determine if the vectors v1 = (1, 2, 3) and v2 = (4, 5, 6) are linearly independent",
      "Show that every group of order p^2 is abelian",
      "Find the greatest common divisor of 1071 and 462 using the Euclidean algorithm"
    ];

    const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];

    console.log('✅ Mock OCR Success');

    return {
      success: true,
      text: randomText + '\n\n[Note: This is mock OCR text for demonstration]'
    };
  } catch (error) {
    console.error('❌ Mock OCR Error:', error);
    return {
      success: false,
      error: error?.message || 'Mock OCR API unavailable'
    };
  }
}

// Mock helper functions
export async function wakeUpRenderServer(): Promise<boolean> {
  console.log('ℹ️ Frontend-only deployment - no server wake-up needed');
  return true;
}

export async function monitorBackendStatus(): Promise<void> {
  console.log('📊 Frontend Status: Using mock API responses');
}

export async function debugNetworkStatus(): Promise<void> {
  console.log('🌐 Network Status: Frontend-only deployment with mock responses');
}