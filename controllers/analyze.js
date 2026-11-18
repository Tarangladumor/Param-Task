export const analyzeUSer = (req, res) => {

    try {
        const { users } = req.body;

        if (users.length === 0) {
            return res.status(400).jsos({
                success: false,
                message: "Users array is empty"
            })
        }

        const requiredFields = [
            "name",
            "age",
            "department",
            "salary"
        ];

        for (let i = 0; i < users.length; i++) {
            const currUser = users[i];
            for (const field of requiredFields) {
                if (
                    currUser[field] === undefined ||
                    currUser[field] === null ||
                    currUser[field] === ""
                ) {
                    return res.status(400).json({
                        success: false,
                        message: `${field} is required for user at index ${i}`
                    });
                }
            }

            if (typeof currUser.name !== "string" || !currUser.name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid name at index ${i}`
                });
            }

            if (
                typeof currUser.age !== "number" ||
                currUser.age <= 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid age at index ${i}`
                });
            }

            if (
                typeof currUser.department !== "string" ||
                !currUser.department.trim()
            ) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid department at index ${i}`
                });
            }

            if (
                typeof currUser.salary !== "number" ||
                currUser.salary < 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid salary at index ${i}`
                });
            }
        }

        const totalUsers = users.length;
        const totalAge = users.reduce(
            (acc, curr) => acc + curr.age,
            0
        );

        const averageAge = Number(
            (totalAge / totalUsers).toFixed(2)
        );

        const departmentCount = users.reduce((acc, curr) => {
            const department = curr.department.trim();

            acc[department] = (acc[department] || 0) + 1;

            return acc;
        }, {});

        const highestPaidUser = users.reduce((highest, curr) => {
            return curr.salary > highest.salary ? curr : highest;
        }, users[0]);

        return res.status(200).json({
            success: true,
            message: "Users analyzed successfully",
            data: {
                totalUsers,
                averageAge,
                departmentCount,
                highestPaidUser
            }
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}