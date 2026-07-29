const pool = require('../config/db');

class PortalModel {
    // User Authentication & Management
    static async getUserByUsername(username) {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            return rows[0] || null;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch user from DB:', err.message);
            return null;
        }
    }

    static async getAllUsers() {
        try {
            const [rows] = await pool.query('SELECT id, username, role, name, email, department_id, status, created_at FROM users ORDER BY id DESC');
            return rows;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch users list:', err.message);
            return [
                { id: 1, username: '2AG22CS001', role: 'student', name: 'Prajwal Patil', status: 'Active' },
                { id: 2, username: 'AGM-FAC-101', role: 'faculty', name: 'Dr. S. V. Shiragur', status: 'Active' },
                { id: 3, username: 'AGM-HOD-101', role: 'hod', name: 'Dr. S. V. Shiragur (HOD CSE)', status: 'Active' },
                { id: 4, username: 'AGM-PRIN-001', role: 'principal', name: 'Dr. Sandeep Kyatanavar', status: 'Active' }
            ];
        }
    }

    static async createUser(userData) {
        const { username, password, role, name, email, department_id } = userData;
        try {
            const [result] = await pool.query(
                'INSERT INTO users (username, password, role, name, email, department_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [username, password || 'password', role, name, email || null, department_id || null, 'Active']
            );
            return { id: result.insertId, username, role, name, email, status: 'Active' };
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to create user:', err.message);
            throw err;
        }
    }

    static async updateUser(id, userData) {
        const { name, role, email, status, password } = userData;
        try {
            if (password) {
                await pool.query(
                    'UPDATE users SET name = ?, role = ?, email = ?, status = ?, password = ? WHERE id = ?',
                    [name, role, email || null, status || 'Active', password, id]
                );
            } else {
                await pool.query(
                    'UPDATE users SET name = ?, role = ?, email = ?, status = ? WHERE id = ?',
                    [name, role, email || null, status || 'Active', id]
                );
            }
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to update user:', err.message);
            throw err;
        }
    }

    static async deleteUser(id) {
        try {
            await pool.query('DELETE FROM users WHERE id = ?', [id]);
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to delete user:', err.message);
            throw err;
        }
    }

    // Student Profile
    static async getStudentProfile(usn) {
        try {
            const [rows] = await pool.query('SELECT * FROM students WHERE usn = ?', [usn]);
            return rows[0] || null;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch student profile:', err.message);
            return null;
        }
    }

    // Attendance
    static async getStudentAttendance(usn) {
        try {
            const [rows] = await pool.query('SELECT * FROM student_attendance WHERE student_usn = ?', [usn]);
            return rows;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch attendance:', err.message);
            return [];
        }
    }

    static async updateAttendance(usn, subjectCode, subjectName, attendedClasses, totalClasses) {
        try {
            await pool.query(
                `INSERT INTO student_attendance (student_usn, subject_code, subject_name, total_classes, attended_classes)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE attended_classes = VALUES(attended_classes), total_classes = VALUES(total_classes)`,
                [usn, subjectCode, subjectName, totalClasses, attendedClasses]
            );
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to update attendance:', err.message);
            throw err;
        }
    }

    // Marks & Grades
    static async getStudentMarks(usn) {
        try {
            const [rows] = await pool.query('SELECT * FROM student_marks WHERE student_usn = ?', [usn]);
            return rows;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch marks:', err.message);
            return [];
        }
    }

    static async updateMarks(usn, subjectCode, subjectName, cie1, cie2, cie3, assignment, grade, result) {
        try {
            await pool.query(
                `INSERT INTO student_marks (student_usn, subject_code, subject_name, cie1, cie2, cie3, assignment, grade, result)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE cie1=VALUES(cie1), cie2=VALUES(cie2), cie3=VALUES(cie3), assignment=VALUES(assignment), grade=VALUES(grade), result=VALUES(result)`,
                [usn, subjectCode, subjectName, cie1, cie2, cie3, assignment, grade, result]
            );
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to update marks:', err.message);
            throw err;
        }
    }

    // Announcements & Broadcasts
    static async getAnnouncements(targetRole = 'all') {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM announcements WHERE target_role = "all" OR target_role = ? ORDER BY id DESC LIMIT 10',
                [targetRole]
            );
            return rows;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch announcements:', err.message);
            return [];
        }
    }

    static async createAnnouncement(senderRole, senderName, title, message, targetRole = 'all') {
        try {
            const [result] = await pool.query(
                'INSERT INTO announcements (sender_role, sender_name, title, message, target_role) VALUES (?, ?, ?, ?, ?)',
                [senderRole, senderName, title, message, targetRole]
            );
            return { id: result.insertId, senderRole, senderName, title, message, targetRole };
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to post announcement:', err.message);
            throw err;
        }
    }

    // Outing Gatepasses
    static async getGatepasses(studentUsn = null) {
        try {
            let sql = 'SELECT * FROM gatepasses';
            const params = [];
            if (studentUsn) {
                sql += ' WHERE student_usn = ?';
                params.push(studentUsn);
            }
            sql += ' ORDER BY id DESC';
            const [rows] = await pool.query(sql, params);
            return rows;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch gatepasses:', err.message);
            return [];
        }
    }

    static async createGatepass(studentUsn, studentName, reason, outDate, inDate) {
        try {
            const [result] = await pool.query(
                'INSERT INTO gatepasses (student_usn, student_name, reason, out_date, in_date, status) VALUES (?, ?, ?, ?, ?, ?)',
                [studentUsn, studentName, reason, outDate, inDate, 'Pending']
            );
            return { id: result.insertId, studentUsn, studentName, reason, outDate, inDate, status: 'Pending' };
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to submit gatepass:', err.message);
            throw err;
        }
    }

    static async updateGatepassStatus(id, status, approvedBy) {
        try {
            await pool.query(
                'UPDATE gatepasses SET status = ?, approved_by = ? WHERE id = ?',
                [status, approvedBy, id]
            );
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to update gatepass status:', err.message);
            throw err;
        }
    }

    // Elective Choice Requests
    static async getElectives(studentUsn = null) {
        try {
            let sql = 'SELECT * FROM elective_requests';
            const params = [];
            if (studentUsn) {
                sql += ' WHERE student_usn = ?';
                params.push(studentUsn);
            }
            sql += ' ORDER BY id DESC';
            const [rows] = await pool.query(sql, params);
            return rows;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch electives:', err.message);
            return [];
        }
    }

    static async createElectiveRequest(studentUsn, studentName, electiveName) {
        try {
            const [result] = await pool.query(
                'INSERT INTO elective_requests (student_usn, student_name, elective_name, cie_status, status) VALUES (?, ?, ?, ?, ?)',
                [studentUsn, studentName, electiveName, 'Eligible', 'Pending']
            );
            return { id: result.insertId, studentUsn, studentName, electiveName, status: 'Pending' };
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to submit elective request:', err.message);
            throw err;
        }
    }

    static async updateElectiveStatus(id, status, approvedBy) {
        try {
            await pool.query(
                'UPDATE elective_requests SET status = ?, approved_by = ? WHERE id = ?',
                [status, approvedBy, id]
            );
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to update elective status:', err.message);
            throw err;
        }
    }

    // Complaints & Grievances
    static async getComplaints(studentUsn = null) {
        try {
            let sql = 'SELECT * FROM complaints';
            const params = [];
            if (studentUsn) {
                sql += ' WHERE student_usn = ?';
                params.push(studentUsn);
            }
            sql += ' ORDER BY id DESC';
            const [rows] = await pool.query(sql, params);
            return rows;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch complaints:', err.message);
            return [];
        }
    }

    static async createComplaint(studentUsn, studentName, category, subject, message) {
        try {
            const [result] = await pool.query(
                'INSERT INTO complaints (student_usn, student_name, category, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)',
                [studentUsn, studentName, category, subject, message, 'Open']
            );
            return { id: result.insertId, studentUsn, studentName, category, subject, message, status: 'Open' };
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to submit complaint:', err.message);
            throw err;
        }
    }

    // Fee Records
    static async getFeeRecord(studentUsn) {
        try {
            const [rows] = await pool.query('SELECT * FROM fee_records WHERE student_usn = ?', [studentUsn]);
            return rows[0] || null;
        } catch (err) {
            console.warn('[PORTAL MODEL WARNING] Failed to fetch fee record:', err.message);
            return null;
        }
    }

    static async updateFeeRecord(studentUsn, studentName, totalFee, paidFee, status, receiptNo) {
        try {
            await pool.query(
                `INSERT INTO fee_records (student_usn, student_name, total_fee, paid_fee, status, last_receipt_no)
                 VALUES (?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE total_fee=VALUES(total_fee), paid_fee=VALUES(paid_fee), status=VALUES(status), last_receipt_no=VALUES(last_receipt_no)`,
                [studentUsn, studentName, totalFee, paidFee, status, receiptNo]
            );
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to update fee record:', err.message);
            throw err;
        }
    }

    static async deleteGatepass(id) {
        try {
            await pool.query('DELETE FROM gatepasses WHERE id = ?', [id]);
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to delete gatepass:', err.message);
            throw err;
        }
    }

    static async deleteElective(id) {
        try {
            await pool.query('DELETE FROM elective_requests WHERE id = ?', [id]);
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to delete elective:', err.message);
            throw err;
        }
    }

    static async deleteComplaint(id) {
        try {
            await pool.query('DELETE FROM complaints WHERE id = ?', [id]);
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to delete complaint:', err.message);
            throw err;
        }
    }

    static async deleteAnnouncement(id) {
        try {
            await pool.query('DELETE FROM announcements WHERE id = ?', [id]);
            return true;
        } catch (err) {
            console.error('[PORTAL MODEL ERROR] Failed to delete announcement:', err.message);
            throw err;
        }
    }
}

module.exports = PortalModel;
